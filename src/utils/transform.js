/**
 * Applies an array of transformation rules to a dataset.
 * 
 * @param {Array<Object>} data - The original dataset.
 * @param {Array<Object>} rules - Array of transformation rules.
 * @returns {Array<Object>} The transformed dataset.
 */
export function applyTransformations(data, rules) {
  if (!data || !rules || rules.length === 0) return data;

  // Clone data so we don't mutate the original
  let transformed = data.map(row => ({ ...row }));

  rules.forEach(rule => {
    if (rule.type === 'trim') {
      transformed = transformed.map(row => ({
        ...row,
        [rule.field]: typeof row[rule.field] === 'string' ? row[rule.field].trim() : row[rule.field]
      }));
    } 
    else if (rule.type === 'uppercase') {
      transformed = transformed.map(row => ({
        ...row,
        [rule.field]: typeof row[rule.field] === 'string' ? row[rule.field].toUpperCase() : row[rule.field]
      }));
    }
    else if (rule.type === 'lowercase') {
      transformed = transformed.map(row => ({
        ...row,
        [rule.field]: typeof row[rule.field] === 'string' ? row[rule.field].toLowerCase() : row[rule.field]
      }));
    }
    else if (rule.type === 'remove_empty_rows') {
      // Check if all fields in the row are empty/null/whitespace
      transformed = transformed.filter(row => {
        return Object.values(row).some(val => 
          val !== null && val !== undefined && String(val).trim() !== ''
        );
      });
    }
    else if (rule.type === 'rename_column') {
      // Note: Renaming is tricky as it affects subsequent rules.
      // For simplicity, we map it directly.
      transformed = transformed.map(row => {
        const newRow = { ...row };
        if (rule.oldName in newRow) {
          newRow[rule.newName] = newRow[rule.oldName];
          delete newRow[rule.oldName];
        }
        return newRow;
      });
    }
  });

  return transformed;
}