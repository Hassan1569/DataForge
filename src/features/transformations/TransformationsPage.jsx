import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { Wand2, Save } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import { applyTransformations } from '@/utils/transform.js';
import mockSource from '@/data/fixtures/transformSource.json';

import TransformRuleBuilder from './components/TransformRuleBuilder.jsx';
import TransformPreview from './components/TransformPreview.jsx';

export default function TransformationsPage() {
  const [rules, setRules] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Extract headers from the first row
  const headers = Object.keys(mockSource[0] || {});

  // Compute transformations on the fly (memoized for performance)
  const transformedData = useMemo(() => {
    return applyTransformations(mockSource, rules);
  }, [rules]);

  const handleAddOrUpdateRule = (rule, index = null) => {
    if (index !== null) {
      // Update existing rule
      setRules(prev => prev.map((r, i) => i === index ? rule : r));
    } else {
      // Add new rule
      setRules(prev => [...prev, rule]);
    }
  };

  const handleRemoveRule = (index) => {
    setRules(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveDataset = async () => {
    const result = await Swal.fire({
      title: 'Save Transformed Dataset?',
      text: 'This will create a new dataset with the transformed records. The original dataset will remain untouched.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1e46d6',
      confirmButtonText: 'Yes, save dataset'
    });

    if (result.isConfirmed) {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        Swal.fire('Saved!', `Successfully saved ${transformedData.length} transformed records.`, 'success');
      }, 800);
    }
  };

  return (
    <PageContainer
      title="Transformation Workspace"
      description="Clean, format, and standardize your dataset before saving or exporting."
      actions={
        <Button onClick={handleSaveDataset} disabled={isSaving || rules.length === 0}>
          <Save size={16} className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Transformed Dataset'}
        </Button>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 items-start">
        
        {/* Left Column: Rule Builder */}
        <div className="space-y-6 sticky top-6">
          <Card>
            <CardHeader 
              title="Transformations" 
              description="Build a pipeline of cleaning rules."
            />
            <CardBody>
              <TransformRuleBuilder 
                headers={headers}
                rules={rules}
                onAddRule={handleAddOrUpdateRule}
                onRemoveRule={handleRemoveRule}
              />
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Live Preview */}
        <div className="space-y-6">
          <Card>
            <CardBody>
              <TransformPreview 
                originalData={mockSource}
                transformedData={transformedData}
                headers={headers}
              />
            </CardBody>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
}