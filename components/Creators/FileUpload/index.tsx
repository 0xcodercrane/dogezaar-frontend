import * as v from 'valibot';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

type FileUploadProps<T> = {
  schema?: any;
  setData: (data: File | string) => void;
  size: string;
  acceptFileType: string[]; // MIME types like ['application/zip', 'image/png']
  accept: string[]; // Extensions like ['.zip', '.png']
};

export const FileUpload = <T,>({
  schema,
  setData,
  size,
  acceptFileType,
  accept,
}: FileUploadProps<T>) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadingError, setUploadingError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null | undefined>();

  // File drop handler
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploadingError(null);
      setSuccess(false);
      setPreview(null);
      setUploading(true);
      setPreview?.(null);

      const file = acceptedFiles[0];

      // Validate MIME type and extension
      const isValidFile =
        acceptFileType.includes(file?.type) || accept.some((ext) => file?.name.endsWith(ext));
      if (!isValidFile) {
        setUploadingError('Invalid file format. Please upload a correct file type.');
        setUploading(false);
        return;
      }

      // If image file, create a preview
      if (file?.type.startsWith('image/')) {
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
        console.log("previewURL", previewURL)
        setPreview?.(previewURL);
        setData(file);
        setSuccess(true);
        setUploading(false);
        return;
      }

      // Handle non-image file reading
      const reader = new FileReader();
      reader.onerror = () => setUploadingError('File reading failed.');

      reader.onload = () => {
        try {
          const uploadedData = reader.result as string;

          if (file?.type === 'application/json') {
            const parsedData = JSON.parse(uploadedData);
            v.parse(schema, parsedData); // Validate with schema
          }

          setData(uploadedData);
          setSuccess(true);
        } catch (error: any) {
          console.error(error?.message);

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
    [acceptFileType, accept, schema, setData]
  );

  // Generate `accept` mapping dynamically
  const acceptMapping = useMemo(() => {
    return acceptFileType.reduce((acc, mimeType) => {
      acc[mimeType] = accept;
      return acc;
    }, {} as Record<string, string[]>);
  }, [acceptFileType, accept]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptMapping,
    multiple: false,
  });

  // Rendering the UI based on state
  const renderContent = useMemo(() => {
    if (isDragActive) {
      return (
        <div className="flex w-44 flex-col items-center">
          <Image
            alt="Drag to upload"
            src="/img/creators/upload.png"
            className="opacity-100 transition-opacity duration-200"
            width={size === 'sm' ? 60 : 131}
            height={size === 'sm' ? 60 : 131}
          />
          <p className="mt-4 text-center text-sm font-medium text-ob-grey-lighter">
            Drop files to upload
          </p>
        </div>
      );
    }

    if (uploading) {
      return (
        <div className="flex flex-col items-center">
          <Image alt="Uploading" src="/img/creators/loader.png" className="animate-spin" width={60} height={60} />
          <p className="mt-4 text-center text-sm font-medium text-ob-grey-lighter">Uploading...</p>
        </div>
      );
    }

    if (uploadingError) {
      return (
        <div className="flex flex-col items-center">
          <Image
            alt="Upload failed"
            src="/img/creators/failed.svg"
            className="opacity-70 transition-opacity duration-200"
            width={60}
            height={60}
          />
          <p className="mt-4 text-center text-sm font-bold text-red-600">{uploadingError}</p>
        </div>
      );
    }

    if (success) {
      if (preview) {
        return (
          <div className="flex flex-col items-center">
            <img alt="Uploaded Preview" src={preview} className="max-h-44 max-w-full rounded shadow-md" />
            <p className="mt-4 text-center text-sm font-bold text-green-600">Successfully uploaded.</p>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center">
          <Image
            alt="Upload successful"
            src="/img/creators/success.svg"
            className="opacity-70 transition-opacity duration-200"
            width={60}
            height={60}
          />
          <p className="mt-4 text-center text-sm font-bold text-green-600">Successfully uploaded.</p>
        </div>
      );
    }

    return (
      <div className="flex w-44 flex-col items-center">
        <Image
          alt="Upload"
          src="/img/creators/upload.png"
          className="opacity-70 transition-opacity duration-200 group-hover:opacity-100"
          width={size === 'sm' ? 60 : 131}
          height={size === 'sm' ? 60 : 131}
        />
        <p className="mt-4 text-center text-sm font-medium text-ob-grey-lighter">
          Click or drag to upload files
        </p>
      </div>
    );
  }, [success, uploadingError, uploading, isDragActive, preview, size]);

  return (
    <div {...getRootProps()} className="group flex h-full w-full cursor-pointer items-center justify-center">
      {renderContent}
      <input {...getInputProps()} />
    </div>
  );
};
