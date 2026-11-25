export default function TransformPreview({ originalData, transformedData, headers }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-ink-900">Live Preview</h4>
        <div className="flex gap-2 text-xs">
          <span className="rounded bg-ink-100 px-2 py-1 text-ink-600">Original: {originalData.length} rows</span>
          <span className="rounded bg-brand-50 px-2 py-1 text-brand-700">Transformed: {transformedData.length} rows</span>
        </div>
      </div>

      <div className="rounded-lg border border-ink-200 bg-white overflow-hidden shadow-sm">
        <div className="table-scroll max-h-[400px] overflow-y-auto">
          <table className="min-w-full divide-y divide-ink-200">
            <thead className="bg-ink-50 sticky top-0 z-10">
              <tr>
                {headers.map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 bg-white">
              {transformedData.slice(0, 10).map((row, i) => (
                <tr key={i} className="hover:bg-ink-50/50">
                  {headers.map(h => {
                    // Highlight changed values
                    const originalVal = originalData[i] ? String(originalData[i][h]) : '';
                    const newVal = String(row[h] || '');
                    const isChanged = originalVal !== newVal;

                    return (
                      <td key={h} className={`whitespace-nowrap px-4 py-2 text-sm ${isChanged ? 'bg-success-50 text-success-900 font-medium' : 'text-ink-800'}`}>
                        {newVal === 'undefined' || newVal === 'null' ? '' : newVal}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-ink-500 italic">Showing first 10 rows. Changes are highlighted in green.</p>
    </div>
  );
}