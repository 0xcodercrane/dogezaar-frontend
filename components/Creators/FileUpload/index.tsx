import * as v from 'valibot';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { TinscriptionSchema } from '../Forms';

type FileUploadProps<T> = {
  schema: any;
  setData: (data: string) => void;
  size: string;
  acceptFileType: string;
  accept: string[];
};

export const FileUpload = <T,>({ schema, setData, size, acceptFileType, accept }: FileUploadProps<T>) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadingError, setUploadingError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploadingError(null);
      setSuccess(false);
      setUploading(true);

      const file = acceptedFiles[0];

      const isJSON = file?.type === 'application/json';
      const isCSV = file?.type === 'text/csv' || file?.name?.endsWith('.csv');

      if (file?.type !== acceptFileType) {
        setUploadingError('Invalid file format. Please upload a correct file type.');
        setUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => setUploadingError('File reading failed.');

      reader.onload = () => {
        try {
          const uploadedData = reader.result as string;

          if (isJSON) {
            const parsedData = JSON.parse(uploadedData);
            v.parse(schema, parsedData);
          }

          if (isCSV || isJSON) {
            setData(uploadedData);
            setSuccess(true);
          }
        } catch (error: any) {
          console.log(error?.message);

          if (error?.name === 'SyntaxError') {
            setUploadingError('Invalid Data format.');
          } else if (error instanceof v.ValiError) {
            setUploadingError(`${error.message}.`);
          } else if (error?.message) {
            setUploadingError(error?.message);
          } else {
            setUploadingError('Unexpected error during parsing.');
          }
        } finally {
          setUploading(false);
        }
      };

      reader.readAsText(file);
    },
    [schema, setData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [acceptFileType]: accept },
    multiple: false
  });

  const renderContent = useMemo(() => {
    if (isDragActive) {
      return (
        <div className='flex w-44 flex-col items-center'>
          <Image
            alt='Drag to upload'
            src='/img/creators/upload.png'
            className='opacity-100 transition-opacity duration-200'
            width={size === 'sm' ? 60 : 131}
            height={size === 'sm' ? 60 : 131}
          />
          <p className='mt-4 text-center text-sm font-medium text-ob-grey-lighter'>Drop files to upload</p>
        </div>
      );
    }

    if (uploading) {
      return (
        <div className='flex flex-col items-center'>
          <Image alt='Uploading' src='/img/creators/loader.png' className='animate-spin' width={60} height={60} />
          <p className='mt-4 text-center text-sm font-medium text-ob-grey-lighter'>Uploading...</p>
        </div>
      );
    }

    if (uploadingError) {
      return (
        <div className='flex flex-col items-center'>
          <Image
            alt='Upload failed'
            src='/img/creators/failed.svg'
            className='opacity-70 transition-opacity duration-200'
            width={60}
            height={60}
          />
          <p className='mt-4 text-center text-sm font-bold text-red-600'>{uploadingError}</p>
        </div>
      );
    }

    if (success) {
      return (
        <div className='flex flex-col items-center'>
          <Image
            alt='Upload successful'
            src='/img/creators/success.svg'
            className='opacity-70 transition-opacity duration-200'
            width={60}
            height={60}
          />
          <p className='mt-4 text-center text-sm font-bold text-green-600'>Successfully uploaded.</p>
        </div>
      );
    }

    return (
      <div className='flex w-44 flex-col items-center'>
        <Image
          alt='Upload'
          src='/img/creators/upload.png'
          className='opacity-70 transition-opacity duration-200 group-hover:opacity-100'
          width={size === 'sm' ? 60 : 131}
          height={size === 'sm' ? 60 : 131}
        />
        <p className='mt-4 text-center text-sm font-medium text-ob-grey-lighter'>Click or drag to upload files</p>
      </div>
    );
  }, [success, uploadingError, uploading, isDragActive]);

  return (
    <div {...getRootProps()} className='group flex h-full w-full cursor-pointer items-center justify-center'>
      {renderContent}
      <input {...getInputProps()} />
    </div>
  );
};
