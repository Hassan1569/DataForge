import { VALIDATION_TYPES } from '@/constants/validationTypes.js';

/**
 * Validates a dataset against a schema.
 * @param {Array<Object>} data - The parsed rows.
 * @param {Object} mapping - The mapping of { sourceField: targetField }.
 * @param {Object} schema - The validation rules.
 * @returns {Object} { isValid, summary, errors }
 */
export function validateDataset(data, mapping, schema) {
  const errors = [];
  const summary = {
    totalRows: data.length,
    validRows: 0,
    errorRows: 0,
    totalErrors: 0,
  };

  // Create a reverse mapping for quick lookups (target -> source)
  const reverseMapping = Object.entries(mapping).reduce((acc, [source, target]) => {
    if (target) acc[target] = source;
    return acc;
  }, {});

  // Keep track of unique values for unique validation
  const uniqueTracker = {};

  data.forEach((row, index) => {
    const rowNumber = index + 1; // 1-based for display
    let rowHasError = false;

    Object.entries(schema).forEach(([field, rules]) => {
      const sourceField = reverseMapping[field];
      
      // If field isn't mapped, skip validation (or flag as missing if required)
      if (!sourceField) {
        if (rules.required) {
          errors.push({
            row: rowNumber,
            field,
            type: VALIDATION_TYPES.REQUIRED,
            value: null,
            message: `Required field "${field}" is not mapped.`,
            suggestion: `Map a source column to "${field}".`
          });
          rowHasError = true;
        }
        return;
      }

      const value = row[sourceField];

      // 1. Required Check
      if (rules.required && (value === undefined || value === null || String(value).trim() === '')) {
        errors.push({
          row: rowNumber,
          field,
          type: VALIDATION_TYPES.REQUIRED,
          value,
          message: `Field "${field}" is required but missing.`,
          suggestion: 'Provide a value for this field.'
        });
        rowHasError = true;
        return; // Skip other checks for this field if it's empty
      }

      // Skip further validation if value is missing and not required
      if (value === undefined || value === null || String(value).trim() === '') {
        return;
      }

      // 2. Type Check
      if (rules.type === 'number') {
        if (isNaN(Number(value))) {
          errors.push({
            row: rowNumber,
            field,
            type: VALIDATION_TYPES.TYPE,
            value,
            message: `Field "${field}" must be a number.`,
            suggestion: 'Remove non-numeric characters.'
          });
          rowHasError = true;
        }
      }

      if (rules.type === 'date') {
        const dateObj = new Date(value);
        if (isNaN(dateObj.getTime())) {
          errors.push({
            row: rowNumber,
            field,
            type: VALIDATION_TYPES.DATE_FORMAT,
            value,
            message: `Field "${field}" must be a valid date.`,
            suggestion: 'Use YYYY-MM-DD format.'
          });
          rowHasError = true;
        }
      }

      // 3. Unique Check
      if (rules.unique) {
        const stringValue = String(value).trim().toLowerCase();
        if (!uniqueTracker[field]) uniqueTracker[field] = new Set();
        
        if (uniqueTracker[field].has(stringValue)) {
          errors.push({
            row: rowNumber,
            field,
            type: VALIDATION_TYPES.UNIQUE,
            value,
            message: `Duplicate value for unique field "${field}".`,
            suggestion: 'Ensure each row has a unique identifier.'
          });
          rowHasError = true;
        } else {
          uniqueTracker[field].add(stringValue);
        }
      }
    });

    if (rowHasError) {
      summary.errorRows++;
    } else {
      summary.validRows++;
    }
  });

  summary.totalErrors = errors.length;

  return {
    isValid: errors.length === 0,
    summary,
    errors
  };
}