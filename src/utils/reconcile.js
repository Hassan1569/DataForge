/**
 * Reconciles two datasets based on a matching key and an optional amount field.
 * 
 * @param {Array<Object>} sourceA - The primary dataset.
 * @param {Array<Object>} sourceB - The secondary dataset.
 * @param {string} keyA - The field name to match in Source A.
 * @param {string} keyB - The field name to match in Source B.
 * @param {string} amountA - (Optional) The amount field in Source A.
 * @param {string} amountB - (Optional) The amount field in Source B.
 * @returns {Object} The reconciliation results broken down into categories.
 */
export function reconcileDatasets(sourceA, sourceB, keyA, keyB, amountA, amountB) {
  const results = {
    matched: [],
    mismatchedAmount: [],
    missingInB: [],
    missingInA: [],
    duplicates: [],
  };

  // 1. Map Source B by its key for O(1) lookups
  const mapB = new Map();
  sourceB.forEach((rowB, index) => {
    const keyVal = rowB[keyB];
    if (!keyVal) return;
    
    if (mapB.has(keyVal)) {
      // We found a duplicate in Source B
      results.duplicates.push({ record: rowB, dataset: 'B', originalIndex: index });
    } else {
      mapB.set(keyVal, { ...rowB, _originalIndex: index });
    }
  });

  // 2. Iterate through Source A and compare
  sourceA.forEach((rowA, index) => {
    const keyVal = rowA[keyA];
    
    if (!keyVal) {
       results.missingInB.push(rowA);
       return;
    }

    if (mapB.has(keyVal)) {
      // Found a match, check amounts if specified
      const rowB = mapB.get(keyVal);
      
      if (amountA && amountB) {
        const amtA = Number(rowA[amountA]);
        const amtB = Number(rowB[amountB]);

        // Compare with a small tolerance for floating point math
        if (Math.abs(amtA - amtB) > 0.01) {
          results.mismatchedAmount.push({ sourceA: rowA, sourceB: rowB });
        } else {
          results.matched.push({ sourceA: rowA, sourceB: rowB });
        }
      } else {
        // If no amount fields provided, a matching key is a full match
        results.matched.push({ sourceA: rowA, sourceB: rowB });
      }
      
      // Remove from map so we know it was matched
      mapB.delete(keyVal);
    } else {
      // Key in A, but not in B
      results.missingInB.push(rowA);
    }
  });

  // 3. Any remaining items in mapB are missing in Source A
  mapB.forEach((rowB) => {
    results.missingInA.push(rowB);
  });

  return results;
}