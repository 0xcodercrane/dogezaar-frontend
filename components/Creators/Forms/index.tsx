import { useState } from 'react'
import { ESteps } from '@/config'
import Steps from './Steps'

export default function Forms() {
  const [currentStep, setCurrentStep] = useState<ESteps>(ESteps.START)
  return (
    <div>
      <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  )
}
