import { useState } from 'react'
import { FileUpload } from '@/components/Forms/FileUpload'
import Button from '@/components/UI/Button'
import * as v from 'valibot'
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import FieldInfo from './FieldInfo'

export const informationSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Collection name must be at least 3 characters.')
  ),
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(20, 'Collection description must be at least 20 characters.')
  ),
  website: v.pipe(
    v.string(),
    v.trim(),
    v.url('Please enter a valid URL for the website.')
  ),
  xHandle: v.pipe(
    v.string(),
    v.trim(),
    v.startsWith(
      'https://x.com',
      'Please enter a valid X handle (e.g., https://x.com/username).'
    )
  ),
  discordHandle: v.optional(v.pipe(v.string(), v.trim()), ''),
  telegramHandle: v.optional(v.pipe(v.string(), v.trim()), ''),
  instagramHandle: v.optional(v.pipe(v.string(), v.trim()), ''),
  creatorName: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(
      3,
      'Creator name is required and must be at least 3 characters.'
    )
  ),
  creatorEmail: v.pipe(
    v.string(),
    v.email('Please enter a valid email address.')
  ),
  creatorDOGEAddress: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Creator DOGE address can not be empty')
  ),
  thumbnail: v.pipe(
    v.file('A thumbnail image file is required.'),
    v.mimeType(
      ['image/jpeg', 'image/png'],
      'Thumbnail must be a JPEG or PNG file.'
    ),
    v.maxSize(1024 * 1024, 'Thumbnail must be smaller than 1 MB.')
  ),
  banner: v.pipe(
    v.file('A banner image file is required.'),
    v.mimeType(
      ['image/jpeg', 'image/png'],
      'Banner must be a JPEG or PNG file.'
    ),
    v.maxSize(1024 * 1024, 'Banner must be smaller than 1 MB.')
  ),
  imageFile: v.pipe(
    v.file('A image file is required'),
    v.mimeType(
      [
        'application/zip',
        'application/x-zip-compressed',
        'multipart/x-zip',
        'application/x-compressed',
      ],
      'Image file must be a Zip file.'
    )
  ),
})

export type TInformationSchema = v.InferInput<typeof informationSchema>

export default function Forms() {
  const imageValidator = async (width: number, height: number, value: File, title: string, size: number) => {
    const maxFileSize = size * 1024 * 1024;

    if (!value.size) {
      return `${title} can not be empty.`;
    }

    if (value.size > maxFileSize) {
      return `${title} must be smaller than ${size} MB.`;
    }

    const isValidRatio = await new Promise<boolean>((resolve) => {
      const img = document.createElement('img');
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const isCloseEnough = Math.abs(imageWidth - width) <= 200 && Math.abs(imageHeight - height) <= 200;
        resolve(isCloseEnough);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(value);
    });

    if (!isValidRatio) {
      return `Invalid image ratio. Please upload an image with a ${width}x${height} resolution or close to it.`;
    }

    return undefined;
  };

  const informationForm = useForm({
    onSubmit: async ({ value }: { value: TInformationSchema }) => {
      try {
        console.log(value)
        v.parse(informationSchema, value)
      } catch (error) {
        console.log('Submission error:', error)
      }
    },
    validatorAdapter: valibotValidator(),
  })

  async function validateDOGEAddress(address: string) {
    const dogecoinAddressRegex = /^D[1-9A-HJ-NP-Za-km-z]{25,34}$/
    const isValidFormat = dogecoinAddressRegex.test(address)
    console.log(address)
    if (!isValidFormat) {
      return 'Invalid DOGE address'
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          informationForm.handleSubmit()
        }}
      >
        <div className='bg-primary-DEFUAULT p-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:gap-8'>
          <div>
            <div className='flex flex-col gap-4 border-solid'>
              <p className='text-[#999] font-bold text-2xl bg-primary-DEFUAULT'>
                Collection Information
              </p>
              <informationForm.Field
                name='name'
                validators={{
                  onChange: informationSchema.entries.name,
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field
                  return (
                    <div className='flex flex-col gam-1'>
                      <label
                        htmlFor={name}
                        className='px-2 text-[#999] font-bold'
                      >
                        Collection Name
                      </label>
                      <input
                        id={name}
                        value={state.value || ''}
                        placeholder='Collection Name'
                        type='text'
                        className='w-full border-none bg-black rounded-md p-3 outline-none'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )
                }}
              />
              <informationForm.Field
                name='description'
                validators={{
                  onChange: informationSchema.entries.description,
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field
                  return (
                    <div className='flex flex-col gam-1'>
                      <label
                        htmlFor={name}
                        className='px-2 text-[#999] font-bold'
                      >
                        Collection Description
                      </label>
                      <textarea
                        id={name}
                        value={state.value || ''}
                        placeholder='collection description...'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        cols={30}
                        rows={2}
                        className='w-full border-none bg-black rounded-md p-3 outline-none'
                      ></textarea>
                      <FieldInfo field={field} />
                    </div>
                  )
                }}
              />
              <div className='flex flex-col gap-4'>
                <informationForm.Field
                  name='thumbnail'
                  validators={{
                    onChangeAsync: async ({ value }: { value: File }) => {
                      return await imageValidator(1000, 1000, value, 'Thumbnail', 1);
                    }
                  }}
                  children={(field: any) => {
                    const { name, handleChange } = field

                    return (
                      <div>
                        <div className='flex flex-col gap-3'>
                          <label
                            htmlFor={name}
                            className='px-2 text-[#999] font-bold'
                          >
                            Collection Thumbnail Image
                          </label>
                          <p>
                            Add your thumbnail image below. This image will
                            represent your collection and appear in previews and
                            listings. Recommended size: 1000x1000px.
                          </p>
                          <div className='p-3 rounded-md border-[1px] border-[#5d5959]'>
                            <FileUpload
                              acceptFileType={['image/*']}
                              accept={['.jpg', 'jpeg', '.png']}
                              size='lg'
                              setData={handleChange}
                            />
                          </div>
                          <FieldInfo field={field} />
                        </div>
                      </div>
                    )
                  }}
                />
                <informationForm.Field
                  name='banner'
                  validators={{
                    onChangeAsync: async ({ value }: { value: File }) => {
                      return await imageValidator(1920, 1200, value, 'Banner', 1);
                    }
                  }}
                  children={(field: any) => {
                    const { name, handleChange } = field

                    return (
                      <div>
                        <div className='flex flex-col gap-3'>
                          <label
                            htmlFor={name}
                            className='px-2 text-[#999] font-bold'
                          >
                            Collection Banner Image
                          </label>
                          <p>
                            Add your banner image below. This image will appear
                            at the top of your collection page. Recommended
                            size: 1920x1200px.
                          </p>
                          <div className='p-3 rounded-md border-[1px] border-[#5d5959]'>
                            <FileUpload
                              acceptFileType={['image/*']}
                              accept={['.jpg', 'jpeg', '.png']}
                              size='lg'
                              setData={handleChange}
                            />
                          </div>
                          <FieldInfo field={field} />
                        </div>
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <p className='text-[#999] font-bold text-2xl bg-primary-DEFUAULT'>
                Creator Details
              </p>
              <div className='flex gap-4'>
                <informationForm.Field
                  name='creatorName'
                  validators={{
                    onChange: informationSchema.entries.creatorName,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field
                    return (
                      <div className='flex flex-col w-1/2'>
                        <label
                          htmlFor={name}
                          className='px-2 text-[#999] font-bold'
                        >
                          Creator Name
                        </label>
                        <input
                          id={name}
                          value={state.value || ''}
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                          type='text'
                          className='w-full border-none bg-black rounded-md p-3 outline-none'
                        />
                        <FieldInfo field={field} />
                      </div>
                    )
                  }}
                />
                <informationForm.Field
                  name='creatorEmail'
                  validators={{
                    onChange: informationSchema.entries.creatorEmail,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field
                    return (
                      <div className='flex flex-col w-1/2'>
                        <label
                          htmlFor={name}
                          className='px-2 text-[#999] font-bold'
                        >
                          Creator email
                        </label>
                        <input
                          id={name}
                          value={state.value || ''}
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                          type='text'
                          className='w-full border-none bg-black rounded-md p-3 outline-none'
                        />
                        <FieldInfo field={field} />
                      </div>
                    )
                  }}
                />
              </div>
              <informationForm.Field
                name='creatorDOGEAddress'
                validators={{
                  onChangeAsync: async ({ value }: { value: string }) => {
                    return await validateDOGEAddress(value)
                  },
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field
                  return (
                    <div>
                      <label
                        htmlFor={name}
                        className='px-2 text-[#999] font-bold'
                      >
                        Creator BRC20 address
                      </label>
                      <input
                        id={name}
                        value={state.value || ''}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        type='text'
                        className='w-full border-none bg-black rounded-md p-3 outline-none'
                      />
                      <FieldInfo field={field} />
                    </div>
                  )
                }}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <p className='text-[#999] font-bold text-2xl bg-primary-DEFUAULT'>
                Creator Social Handles
              </p>
              <informationForm.Field
                name='website'
                validators={{
                  onChange: informationSchema.entries.website,
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field

                  return (
                    <div className='flex flex-col gap-3'>
                      <label
                        htmlFor={name}
                        className='px-2 text-[#999] font-bold'
                      >
                        Website
                      </label>
                      <input
                        value={state.value || ''}
                        type='text'
                        id={name}
                        placeholder='https://www.example.com'
                        className='w-full border-none bg-black rounded-md p-3 outline-none'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )
                }}
              />
              <div className='flex gap-4'>
                <informationForm.Field
                  name='discordHandle'
                  validators={{
                    onChange: informationSchema.entries.discordHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field

                    return (
                      <div className='flex flex-col w-1/2'>
                        <label
                          htmlFor={name}
                          className='px-2 text-[#999] font-bold'
                        >
                          Discord Link
                        </label>
                        <input
                          type='text'
                          id={name}
                          value={state.value || ''}
                          placeholder=''
                          className='w-full border-none bg-black rounded-md p-3 outline-none'
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )
                  }}
                />

                <informationForm.Field
                  name='xHandle'
                  validators={{
                    onChange: informationSchema.entries.xHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field

                    return (
                      <div className='flex flex-col w-1/2'>
                        <label
                          htmlFor={name}
                          className='px-2 text-[#999] font-bold'
                        >
                          Twitter
                        </label>
                        <input
                          type='text'
                          value={state.value || ''}
                          id={name}
                          className='w-full border-none bg-black rounded-md p-3 outline-none'
                          placeholder=''
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )
                  }}
                />
              </div>
              <div className='flex gap-4'>
                <informationForm.Field
                  name='telegramHandle'
                  validators={{
                    onChange: informationSchema.entries.telegramHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field

                    return (
                      <div className='flex flex-col w-1/2'>
                        <label
                          htmlFor={name}
                          className='px-2 text-[#999] font-bold'
                        >
                          Telegram
                        </label>
                        <input
                          type='text'
                          id={name}
                          value={state.value || ''}
                          placeholder=''
                          className='w-full border-none bg-black rounded-md p-3 outline-none'
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )
                  }}
                />
                <informationForm.Field
                  name='instagramHandle'
                  validators={{
                    onChange: informationSchema.entries.instagramHandle,
                  }}
                  children={(field: any) => {
                    const { state, name, handleBlur, handleChange } = field

                    return (
                      <div className='flex flex-col w-1/2'>
                        <label
                          htmlFor={name}
                          className='px-2 text-[#999] font-bold'
                        >
                          Instagram
                        </label>
                        <input
                          type='text'
                          id={name}
                          value={state.value || ''}
                          placeholder=''
                          className='w-full border-none bg-black rounded-md p-3 outline-none'
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )
                  }}
                />
              </div>
            </div>
            <informationForm.Field
              name='imageFile'
              validators={{
                onChange: informationSchema.entries.imageFile,
              }}
              children={(field: any) => {
                const { handleChange } = field
                return (
                  <div className='flex flex-col mt-5 gap-3'>
                    <p className='text-[#999] font-bold text-2xl bg-primary-DEFUAULT'>
                      Collection Images
                    </p>
                    <p>Add your collection image .zip file below.</p>
                    <div className='p-4 rounded-md border-[1px] border-[#5d5959]'>
                      <FileUpload
                        acceptFileType={[
                          'application/zip',
                          'application/x-zip-compressed',
                          'multipart/x-zip',
                          'application/x-compressed',
                        ]}
                        accept={['.zip']}
                        size='lg'
                        setData={handleChange}
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                )
              }}
            />
            {/* <div className='w-full flex justify-end gap-12'>
            <Button content='Submit' />
          </div> */}
            <informationForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className='w-full flex justify-end'>
                  <button
                    type='submit'
                    disabled={!canSubmit}
                    className='border-2 rounded-md border-primary px-3 py-2 w-32'
                  >
                    {isSubmitting ? '...' : 'Submit'}
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
