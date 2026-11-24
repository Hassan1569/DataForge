import Button from '@/components/ui/Button.jsx';

export default function StepPreview({ file, format, parsedData, headers, onNext, onBack }) {
  const previewData = parsedData.slice(0, 5);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink-900">Preview Source Data</h3>
          <p className="text-sm text-ink-500">
            File: {file.name} ({format.toUpperCase()}) · {parsedData.length} records detected
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-ink-200 bg-white overflow-hidden shadow-sm">
        <div className="table-scroll">
          <table className="min-w-full divide-y divide-ink-200">
            <thead className="bg-ink-50">
              <tr>
                {headers.map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 bg-white">
              {previewData.map((row, i) => (
                <tr key={i}>
                  {headers.map(h => (
                    <td key={h} className="whitespace-nowrap px-4 py-3 text-sm text-ink-800">
                      {row[h] !== undefined ? String(row[h]) : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-ink-500 italic">
        Showing first 5 rows of {parsedData.length} total.
      </div>

      <div className="mt-8 flex justify-between border-t border-ink-200 pt-4">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Configure Field Mapping</Button>
      </div>
    </div>
  );
}