import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';

export default function StepUpload({ onFileSelect, isProcessing, error }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
    if (e.type === 'dragleave') setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      {error && (
        <div className="mb-4 rounded-md bg-danger-50 p-3 text-sm text-danger-700 border border-danger-200">
          {error}
        </div>
      )}
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 transition-colors ${
          isDragActive ? 'border-brand-500 bg-brand-50' : 'border-ink-300 bg-white hover:bg-ink-50'
        }`}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <UploadCloud size={28} />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-ink-900">Upload your dataset</h3>
        <p className="mb-6 text-sm text-ink-500">Supported formats: CSV, JSON, XML</p>
        
        <input
          type="file"
          accept=".csv,.json,.xml"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
        
        <Button 
          onClick={() => fileInputRef.current?.click()} 
          disabled={isProcessing}
        >
          {isProcessing ? 'Parsing file...' : 'Browse Files'}
        </Button>
        <p className="mt-4 text-xs text-ink-400">or drag and drop here</p>
      </div>
    </div>
  );
}