import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import Badge from '@/components/ui/Badge.jsx';
import { GitCompareArrows, ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { reconcileDatasets } from '@/utils/reconcile.js';
import mockSources from '@/data/fixtures/reconciliationSources.json';

const DATASET_OPTIONS = [
  { id: 'sourceA', label: 'Internal Ledger (Source A)' },
  { id: 'sourceB', label: 'Bank Statement (Source B)' },
];

export default function ReconciliationPage() {
  // State for selections
  const [datasetA, setDatasetA] = useState('sourceA');
  const [datasetB, setDatasetB] = useState('sourceB');
  const [keyA, setKeyA] = useState('id');
  const [keyB, setKeyB] = useState('transaction_id');
  const [amountA, setAmountA] = useState('amount');
  const [amountB, setAmountB] = useState('total');

  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate processing time
    setTimeout(() => {
      const dataA = mockSources[datasetA] || [];
      const dataB = mockSources[datasetB] || [];
      
      const res = reconcileDatasets(dataA, dataB, keyA, keyB, amountA, amountB);
      setResults(res);
      setIsRunning(false);
    }, 800);
  };

  return (
    <PageContainer
      title="Reconciliation Workspace"
      description="Compare two datasets to identify mismatches and missing records."
    >
      {!results ? (
        <Card className="max-w-4xl mx-auto mt-6">
          <CardHeader 
            title="Configure Comparison" 
            description="Map the identifiers and amounts between the two sources."
          />
          <CardBody className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Source A Config */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-brand-600 border-b border-ink-200 pb-2">Source A</h4>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1">Dataset</label>
                  <select value={datasetA} onChange={e => setDatasetA(e.target.value)} className="w-full rounded-md border border-ink-300 p-2 text-sm">
                    {DATASET_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1">Matching ID Field</label>
                  <select value={keyA} onChange={e => setKeyA(e.target.value)} className="w-full rounded-md border border-ink-300 p-2 text-sm">
                    <option value="id">id</option>
                    <option value="description">description</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1">Amount Field</label>
                  <select value={amountA} onChange={e => setAmountA(e.target.value)} className="w-full rounded-md border border-ink-300 p-2 text-sm">
                    <option value="amount">amount</option>
                    <option value="">(Ignore amount)</option>
                  </select>
                </div>
              </div>

              {/* Source B Config */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-brand-600 border-b border-ink-200 pb-2">Source B</h4>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1">Dataset</label>
                  <select value={datasetB} onChange={e => setDatasetB(e.target.value)} className="w-full rounded-md border border-ink-300 p-2 text-sm">
                    {DATASET_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1">Matching ID Field</label>
                  <select value={keyB} onChange={e => setKeyB(e.target.value)} className="w-full rounded-md border border-ink-300 p-2 text-sm">
                    <option value="transaction_id">transaction_id</option>
                    <option value="memo">memo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1">Amount Field</label>
                  <select value={amountB} onChange={e => setAmountB(e.target.value)} className="w-full rounded-md border border-ink-300 p-2 text-sm">
                    <option value="total">total</option>
                    <option value="">(Ignore amount)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-ink-200 flex justify-end">
              <Button onClick={handleRun} disabled={isRunning} className="w-48">
                {isRunning ? 'Running engine...' : <><GitCompareArrows size={16} className="mr-2" /> Run Reconciliation</>}
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex items-center justify-between">
             <h2 className="text-lg font-semibold text-ink-900">Reconciliation Results</h2>
             <Button variant="secondary" onClick={() => setResults(null)}>New Comparison</Button>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 size={24} className="text-success-500 mb-2" />
                <p className="text-2xl font-bold text-ink-900">{results.matched.length}</p>
                <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">Matched</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6 text-center">
                <AlertTriangle size={24} className="text-warning-500 mb-2" />
                <p className="text-2xl font-bold text-ink-900">{results.mismatchedAmount.length}</p>
                <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">Mismatches</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6 text-center">
                <XCircle size={24} className="text-danger-500 mb-2" />
                <p className="text-2xl font-bold text-ink-900">{results.missingInB.length}</p>
                <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">Missing in B</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6 text-center">
                <XCircle size={24} className="text-danger-500 mb-2" />
                <p className="text-2xl font-bold text-ink-900">{results.missingInA.length}</p>
                <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">Missing in A</p>
              </CardBody>
            </Card>
          </div>

          {/* Details Tables */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Mismatches */}
            {results.mismatchedAmount.length > 0 && (
              <Card>
                <CardHeader title="Amount Mismatches" description="Keys matched, but the amounts differ." />
                <div className="table-scroll">
                  <table className="min-w-full divide-y divide-ink-200">
                    <thead className="bg-ink-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Key</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Source A Value</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Source B Value</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-200 bg-white">
                      {results.mismatchedAmount.map((row, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2 text-sm font-medium text-ink-900">{row.sourceA[keyA]}</td>
                          <td className="px-4 py-2 text-sm text-ink-600">${row.sourceA[amountA]}</td>
                          <td className="px-4 py-2 text-sm text-ink-600">${row.sourceB[amountB]}</td>
                          <td className="px-4 py-2 text-sm text-danger-600 font-medium">
                            ${Math.abs(row.sourceA[amountA] - row.sourceB[amountB]).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Missing Records */}
            {(results.missingInB.length > 0 || results.missingInA.length > 0) && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader title="Missing in Source B" description="Records in A that don't exist in B." />
                    <CardBody>
                      <ul className="divide-y divide-ink-100">
                        {results.missingInB.map((row, i) => (
                          <li key={i} className="py-2 flex justify-between text-sm">
                            <span className="font-medium text-ink-900">{row[keyA]}</span>
                            <span className="text-ink-500">${row[amountA]}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader title="Missing in Source A" description="Records in B that don't exist in A." />
                    <CardBody>
                      <ul className="divide-y divide-ink-100">
                        {results.missingInA.map((row, i) => (
                          <li key={i} className="py-2 flex justify-between text-sm">
                            <span className="font-medium text-ink-900">{row[keyB]}</span>
                            <span className="text-ink-500">${row[amountB]}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
               </div>
            )}

          </div>
        </div>
      )}
    </PageContainer>
  );
}