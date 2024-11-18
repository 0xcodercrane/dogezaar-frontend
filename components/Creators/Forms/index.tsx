import { useState } from 'react'
import { ESteps } from '@/config'
import Steps from './Steps'
import { FileUpload } from '@/components/Forms/FileUpload'
import Button from '@/components/UI/Button'

export default function Forms() {
  const [currentStep, setCurrentStep] = useState<ESteps>(ESteps.START)
  const [file, setFile] = useState<File | string>()
  const [thumbnailPreview, setThumbnailPreview] = useState<
    string | null | undefined
  >(null)
  const [bannerPreview, setBannerPreview] = useState<string | null | undefined>(
    null
  )

  function handleChange(value: File | string) {
    setFile(value)
  }

  return (
    <div>
      <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className='bg-primary-DEFUAULT p-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:gap-8'>
        <div>
          <div className='flex flex-col gap-4 border-solid'>
            <p className='text-[#00ff2dc7] font-bold text-2xl bg-primary-DEFUAULT'>
              Collection Information
            </p>
            <div className='flex flex-col gam-1'>
              <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                Collection Name
              </label>
              <input
                type='text'
                id='collection'
                className='w-full border-none bg-black rounded-md p-3 outline-none'
              />
            </div>
            <div className='flex flex-col gam-1'>
              <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                Collection Description
              </label>
              <textarea
                name=''
                id=''
                cols={30}
                rows={2}
                className='w-full border-none bg-black rounded-md p-3 outline-none'
              ></textarea>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-3'>
                <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                  Collection Thumbnail Image
                </label>
                <p>
                  Add your thumbnail image below. This image will represent your
                  collection and appear in previews and listings. Recommended
                  size: 1000x1000px.
                </p>
                <div className='p-3 rounded-md border-[1px] border-[#5d5959]'>
                  <FileUpload
                    acceptFileType='image/*'
                    accept={['.jpg', 'jpeg', '.png']}
                    size='lg'
                    setData={handleChange}
                    preview={thumbnailPreview}
                    setPreview={setThumbnailPreview}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                  Collection Banner Image
                </label>
                <p>
                  Add your banner image below. This image will appear at the top
                  of your collection page. Recommended size: 1920x1200px.
                </p>
                <div className='p-4 rounded-md border-[1px] border-[#5d5959]'>
                  <FileUpload
                    acceptFileType='image/*'
                    accept={['.jpg', 'jpeg', '.png']}
                    size='lg'
                    setData={handleChange}
                    preview={bannerPreview}
                    setPreview={setBannerPreview}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-[#00ff2dc7] font-bold text-2xl bg-primary-DEFUAULT'>
                Creator Details
              </p>
              <div className='flex gap-4'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                    Creator Name
                  </label>
                  <input
                    type='text'
                    id='collection'
                    className='w-full border-none bg-black rounded-md p-3 outline-none'
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                    Creator email
                  </label>
                  <input
                    type='text'
                    id='collection'
                    className='w-full border-none bg-black rounded-md p-3 outline-none'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                  Creator BRC20 address
                </label>
                <input
                  type='text'
                  id='collection'
                  className='w-full border-none bg-black rounded-md p-3 outline-none'
                />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='text-[#00ff2dc7] font-bold text-2xl bg-primary-DEFUAULT'>
                Creator Social Handles
              </p>
              <div className='flex flex-col gap-3'>
                <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                  Website
                </label>
                <input
                  type='text'
                  id='collection'
                  className='w-full border-none bg-black rounded-md p-3 outline-none'
                />
              </div>
              <div className='flex gap-4'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                    Discord Link
                  </label>
                  <input
                    type='text'
                    id='collection'
                    className='w-full border-none bg-black rounded-md p-3 outline-none'
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                    Twitter
                  </label>
                  <input
                    type='text'
                    id='collection'
                    className='w-full border-none bg-black rounded-md p-3 outline-none'
                  />
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                    Telegram
                  </label>
                  <input
                    type='text'
                    id='collection'
                    className='w-full border-none bg-black rounded-md p-3 outline-none'
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='' className='px-2 text-[#00ff2dc7] font-bold'>
                    Instagram
                  </label>
                  <input
                    type='text'
                    id='collection'
                    className='w-full border-none bg-black rounded-md p-3 outline-none'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center gap-12'>
            <Button content='Previous' />
            <Button content='Next' />
          </div>
        </div>
      </div>
    </div>
  )
}
