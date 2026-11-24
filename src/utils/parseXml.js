import { XMLParser } from 'fast-xml-parser';

export function parseXml(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '@_',
        });
        const result = parser.parse(e.target.result);
        
        // Assuming the root node contains an array of records (e.g., <records><record>...</record></records>)
        const rootKey = Object.keys(result)[0];
        let records = result[rootKey];
        
        if (!Array.isArray(records)) {
          records = [records]; // Wrap single record in an array
        }
        
        resolve(records);
      } catch (error) {
        reject(new Error('Invalid XML format.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}