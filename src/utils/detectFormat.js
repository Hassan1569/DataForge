import { FILE_FORMATS } from '@/constants/fileFormats.js';

export function detectFormat(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  if (extension === 'csv') return FILE_FORMATS.CSV;
  if (extension === 'json') return FILE_FORMATS.JSON;
  if (extension === 'xml') return FILE_FORMATS.XML;
  return null;
}