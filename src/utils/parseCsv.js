import Papa from 'papaparse';

export function parseCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(results.errors[0].message));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => reject(error),
    });
  });
}