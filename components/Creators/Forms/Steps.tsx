import { ESteps } from '@/config'
import { FaRegCircle, FaRegCircleCheck } from 'react-icons/fa6'

export default function Steps({
    setCurrentStep,
  currentStep,
}: {
    setCurrentStep: (step: number) => void
  currentStep: ESteps
}) {
  return (
    <div className='my-5'>
      <div className='flex gap-4 align-center justify-center text-[24px]'>
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep >= ESteps.START && 'text-white'
          }`}
          onClick={() => setCurrentStep(ESteps.START)}
        >
          {currentStep >= ESteps.START ? <FaRegCircleCheck /> : <FaRegCircle />}
          <span>Get Started</span>
        </div>
        <div className='flex items-center'>
          <span
            className={`inline-block w-20 h-1 ${
              currentStep >= ESteps.INFORMATION
                ? 'bg-white'
                : 'bg-primary-DEFUAULT'
            }`}
          ></span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep >= ESteps.INFORMATION && 'text-white'
          }`}
          onClick={() => setCurrentStep(ESteps.INFORMATION)}
        >
          {currentStep >= ESteps.INFORMATION ? (
            <FaRegCircleCheck />
          ) : (
            <FaRegCircle />
          )}
          <span>Collection Information</span>
        </div>
        <div className='flex items-center'>
          <span
            className={`inline-block w-20 h-1 ${
              currentStep >= ESteps.CHOOSE ? 'bg-white' : 'bg-primary-DEFUAULT'
            }`}
          ></span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep >= ESteps.CHOOSE && 'text-white'
          }`}
          onClick={() => setCurrentStep(ESteps.CHOOSE)}
        >
          {currentStep >= ESteps.CHOOSE ? (
            <FaRegCircleCheck />
          ) : (
            <FaRegCircle />
          )}
          <span>Getting Start</span>
        </div>
        <div className='flex items-center'>
          <span
            className={`inline-block w-20 h-1 ${
              currentStep >= ESteps.DETERMINE
                ? 'bg-white'
                : 'bg-primary-DEFUAULT'
            }`}
          ></span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep >= ESteps.DETERMINE && 'text-white'
          }`}
          onClick={() => setCurrentStep(ESteps.DETERMINE)}
        >
          {currentStep >= ESteps.DETERMINE ? (
            <FaRegCircleCheck />
          ) : (
            <FaRegCircle />
          )}
          <span>Getting Start</span>
        </div>
      </div>
    </div>
  )
}
