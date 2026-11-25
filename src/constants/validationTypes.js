export const VALIDATION_TYPES = Object.freeze({
  REQUIRED: 'required',
  TYPE: 'type',
  UNIQUE: 'unique',
  MIN: 'min',
  MAX: 'max',
  DATE_FORMAT: 'date_format',
  PATTERN: 'pattern',
});

export const VALIDATION_TYPE_LABEL = Object.freeze({
  [VALIDATION_TYPES.REQUIRED]: 'Required field',
  [VALIDATION_TYPES.TYPE]: 'Invalid type',
  [VALIDATION_TYPES.UNIQUE]: 'Duplicate value',
  [VALIDATION_TYPES.MIN]: 'Below minimum',
  [VALIDATION_TYPES.MAX]: 'Above maximum',
  [VALIDATION_TYPES.DATE_FORMAT]: 'Invalid date format',
  [VALIDATION_TYPES.PATTERN]: 'Invalid pattern',
});