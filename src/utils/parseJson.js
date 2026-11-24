export function parseJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        // Ensure it's an array of objects
        if (!Array.isArray(data)) {
          reject(new Error('JSON file must contain an array of objects.'));
          return;
        }
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON format.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}