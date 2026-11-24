import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowUpDown, FileText, Trash2, Edit2 } from 'lucide-react';
import Badge from '@/components/ui/Badge.jsx';
import { FILE_FORMAT_LABEL } from '@/constants/fileFormats.js';

export default function DatasetTable({ 
  datasets, 
  sortConfig, 
  onSort, 
  onDeleteClick, 
  onRenameClick 
}) {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={14} className="ml-1 text-ink-300" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUpDown size={14} className="ml-1 text-brand-600" />
      : <ArrowUpDown size={14} className="ml-1 rotate-180 text-brand-600" />;
  };

  const SortHeader = ({ label, sortKey }) => (
    <th 
      scope="col" 
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-500 cursor-pointer hover:bg-ink-50"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {getSortIcon(sortKey)}
      </div>
    </th>
  );

  return (
    <div className="table-scroll">
      <table className="min-w-full divide-y divide-ink-200">
        <thead className="bg-ink-50">
          <tr>
            <SortHeader label="Dataset Name" sortKey="name" />
            <SortHeader label="Format" sortKey="format" />
            <SortHeader label="Records" sortKey="recordCount" />
            <SortHeader label="Status" sortKey="status" />
            <SortHeader label="Date Created" sortKey="createdAt" />
            <th scope="col" className="relative px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-200 bg-white">
          {datasets.map((ds) => (
            <tr key={ds.id} className="hover:bg-ink-50/50 transition-colors">
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-50 text-brand-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <Link 
                      to={`/datasets/${ds.id}`}
                      className="text-sm font-medium text-ink-900 hover:text-brand-600 hover:underline"
                    >
                      {ds.name}
                    </Link>
                    <p className="text-xs text-ink-500">{ds.id}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-600 uppercase">
                {FILE_FORMAT_LABEL[ds.format] || ds.format}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-900 font-medium">
                {ds.recordCount.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge tone={ds.status === 'completed' ? 'success' : 'danger'}>
                  {ds.status === 'completed' ? 'Completed' : 'Failed'}
                </Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-500">
                {format(new Date(ds.createdAt), 'MMM d, yyyy HH:mm')}
              </td>
              <td className="relative whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => onRenameClick(ds)}
                    className="p-1.5 text-ink-400 hover:text-brand-600 hover:bg-brand-50 rounded"
                    title="Rename"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDeleteClick(ds)}
                    className="p-1.5 text-ink-400 hover:text-danger-600 hover:bg-danger-50 rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}