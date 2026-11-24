import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer.jsx';
import Button from '@/components/ui/Button.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import Pagination from '@/components/tables/Pagination.jsx';
import { useDatasets } from '@/hooks/useDatasets.js';
import { ROUTES } from '@/constants/routes.js';

import DatasetFilters from './components/DatasetFilters.jsx';
import DatasetTable from './components/DatasetTable.jsx';

const ITEMS_PER_PAGE = 5;

export default function DatasetsPage() {
  const { datasets, isLoading, error, deleteDataset, renameDataset } = useDatasets();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  const filteredAndSortedDatasets = useMemo(() => {
    let result = [...datasets];

    if (search) {
      result = result.filter((ds) => 
        ds.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((ds) => ds.status === statusFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [datasets, search, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedDatasets.length / ITEMS_PER_PAGE);
  const paginatedDatasets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedDatasets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedDatasets, currentPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDeleteClick = async (dataset) => {
    const result = await Swal.fire({
      title: 'Delete Dataset?',
      text: `Are you sure you want to delete "${dataset.name}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      await deleteDataset(dataset.id);
      Swal.fire('Deleted!', 'The dataset has been removed.', 'success');
      if (paginatedDatasets.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleRenameClick = async (dataset) => {
    const { value: newName } = await Swal.fire({
      title: 'Rename Dataset',
      input: 'text',
      inputValue: dataset.name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'You need to write a name!';
      },
    });

    if (newName && newName !== dataset.name) {
      await renameDataset(dataset.id, newName);
      Swal.fire('Renamed!', 'The dataset name has been updated.', 'success');
    }
  };

  return (
    <PageContainer
      title="Datasets"
      description="Manage and explore your imported data files."
      actions={
        <Link to={ROUTES.IMPORT_WIZARD}>
          <Button size="sm" variant="primary">
            <Plus size={14} />
            Import Dataset
          </Button>
        </Link>
      }
    >
      <div className="rounded-lg border border-ink-200 bg-white shadow-sm flex flex-col">
        <DatasetFilters 
          search={search}
          onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
          statusFilter={statusFilter}
          onStatusChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
        />
        
        {isLoading ? (
          <div className="py-20"><Loader label="Loading datasets…" /></div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-danger-600">{error}</div>
        ) : filteredAndSortedDatasets.length === 0 ? (
          <EmptyState 
            title="No datasets found" 
            description="Try adjusting your search or filters."
          />
        ) : (
          <>
            <DatasetTable 
              datasets={paginatedDatasets}
              sortConfig={sortConfig}
              onSort={handleSort}
              onDeleteClick={handleDeleteClick}
              onRenameClick={handleRenameClick}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </PageContainer>
  );
}