import { useState } from 'react';
import { detectFormat } from '@/utils/detectFormat.js';
import { parseCsv } from '@/utils/parseCsv.js';
import { parseJson } from '@/utils/parseJson.js';
import { parseXml } from '@/utils/parseXml.js';
import { validateDataset } from '@/utils/validators.js';
import { FILE_FORMATS } from '@/constants/fileFormats.js';
import defaultSchema from '@/data/schemas/defaultSchema.json';

export function useImportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  
  // Validation State
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setError(null);
    const detectedFormat = detectFormat(selectedFile.name);
    
    if (!detectedFormat) {
      setError('Unsupported file format. Please upload CSV, JSON, or XML.');
      return;
    }

    setIsProcessing(true);
    try {
      let data = [];
      if (detectedFormat === FILE_FORMATS.CSV) data = await parseCsv(selectedFile);
      if (detectedFormat === FILE_FORMATS.JSON) data = await parseJson(selectedFile);
      if (detectedFormat === FILE_FORMATS.XML) data = await parseXml(selectedFile);

      if (data.length === 0) throw new Error('File is empty or contains no valid records.');

      const extractedHeaders = Array.from(
        new Set(data.slice(0, 5).flatMap(Object.keys))
      );

      const initialMapping = {};
      extractedHeaders.forEach(h => { initialMapping[h] = h; });

      setFile(selectedFile);
      setFormat(detectedFormat);
      setParsedData(data);
      setHeaders(extractedHeaders);
      setMapping(initialMapping);
      setCurrentStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateMapping = (sourceField, targetField) => {
    setMapping(prev => ({ ...prev, [sourceField]: targetField }));
  };

  const runValidation = async () => {
    setIsValidating(true);
    // Simulate network latency for UX purposes
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = validateDataset(parsedData, mapping, defaultSchema);
    setValidationResult(result);
    setIsValidating(false);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const reset = () => {
    setCurrentStep(1);
    setFile(null);
    setFormat(null);
    setParsedData([]);
    setHeaders([]);
    setMapping({});
    setValidationResult(null);
    setError(null);
  };

  return {
    currentStep, file, format, parsedData, headers, mapping, isProcessing, error,
    validationResult, isValidating,
    handleFileSelect, updateMapping, runValidation, nextStep, prevStep, reset, setError
  };
}