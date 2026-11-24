import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import { useImportWizard } from '@/hooks/useImportWizard.js';

import WizardStepIndicator from './wizard/WizardStepIndicator.jsx';
import StepUpload from './wizard/StepUpload.jsx';
import StepPreview from './wizard/StepPreview.jsx';
import StepMapping from './wizard/StepMapping.jsx';
import StepValidate from './wizard/StepValidate.jsx';
import StepReview from './wizard/StepReview.jsx';

export default function ImportWizardPage() {
  const wizard = useImportWizard();

  return (
    <PageContainer
      title="Import Wizard"
      description="Upload, map, and validate your business data."
    >
      <WizardStepIndicator currentStep={wizard.currentStep} />

      <Card>
        <CardBody className="min-h-[500px]">
          {wizard.currentStep === 1 && (
            <StepUpload
              onFileSelect={wizard.handleFileSelect}
              isProcessing={wizard.isProcessing}
              error={wizard.error}
            />
          )}
          
          {wizard.currentStep === 2 && (
            <StepPreview
              file={wizard.file}
              format={wizard.format}
              parsedData={wizard.parsedData}
              headers={wizard.headers}
              onNext={wizard.nextStep}
              onBack={wizard.prevStep}
            />
          )}

          {wizard.currentStep === 3 && (
            <StepMapping
              headers={wizard.headers}
              mapping={wizard.mapping}
              onMapChange={wizard.updateMapping}
              onNext={wizard.nextStep}
              onBack={wizard.prevStep}
            />
          )}

          {wizard.currentStep === 4 && (
            <StepValidate
              parsedData={wizard.parsedData}
              mapping={wizard.mapping}
              onNext={wizard.nextStep}
              onBack={wizard.prevStep}
            />
          )}

          {wizard.currentStep === 5 && (
            <StepReview
              file={wizard.file}
              format={wizard.format}
              parsedData={wizard.parsedData}
              onBack={wizard.prevStep}
            />
          )}
        </CardBody>
      </Card>
    </PageContainer>
  );
}