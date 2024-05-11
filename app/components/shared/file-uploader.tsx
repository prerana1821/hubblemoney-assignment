import { useRef, useEffect, useState } from "react";
import { FaUpload, FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { ImageFileData } from "@/types/app";
import toast from "react-hot-toast";
import Image from "next/image";

interface FileUploaderProps {
  id: string;
  label: string;
  ownerLicense: ImageFileData[];
  onUpload: (rawfiles: ImageFileData[], id: string) => void;
  onDelete: () => void;
  count: number;
  formats: string[];
}

export default function FileUploader({
  id,
  label,
  ownerLicense,
  onUpload,
  onDelete,
  count,
  formats,
}: FileUploaderProps) {
  const dropContainer = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleDrop(
    e: DragEvent | React.ChangeEvent<HTMLInputElement>,
    type: "inputFile" | "dropArea"
  ) {
    let files: FileList | [] = [];

    if (type === "inputFile") {
      const inputElement = e.target as HTMLInputElement;
      files = inputElement.files ? inputElement.files : [];
    } else {
      const dragEvent = e as DragEvent;
      if (dragEvent.dataTransfer) {
        dragEvent.preventDefault();
        dragEvent.stopPropagation();
        setDragging(false);
        files = dragEvent.dataTransfer.files
          ? dragEvent.dataTransfer.files
          : [];
      }
    }

    const allFilesValid = Array.from(files).every((file) => {
      return formats.some((format) => file.type.endsWith(`/${format}`));
    });

    if (ownerLicense.length > count) {
      toast.error(`Only ${count} files can be uploaded`);
      return;
    }

    if (!allFilesValid) {
      toast.error(
        `Invalid file format. Please only upload ${formats
          .join(", ")
          .toUpperCase()}`
      );
      return;
    }

    if (count && count < files.length) {
      toast.error(
        `Only ${count} file${count !== 1 ? "s" : ""} can be uploaded at a time`
      );
      return;
    }

    if (files && files.length) {
      try {
        const nFiles = Array.from(files).map(async (file) => {
          const base64String = await convertFileBase64(file);
          return {
            name: file.name,
            photo: base64String,
            type: file.type,
            size: file.size,
            file: file,
          };
        });

        Promise.all(nFiles).then((newFiles) => {
          onUpload(newFiles, id);
        });
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.error("Error uploading files. Please try again.");
      }
    }
  }

  async function convertFileBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    function handleDragOver(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    }
    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
    dropContainer.current?.addEventListener("dragover", handleDragOver);
    dropContainer.current?.addEventListener("drop", (e) =>
      handleDrop(e, "dropArea")
    );
    dropContainer.current?.addEventListener("dragleave", handleDragLeave);

    return () => {
      if (dropContainer.current) {
        dropContainer.current.removeEventListener("dragover", handleDragOver);
        dropContainer.current.removeEventListener("drop", (e) =>
          handleDrop(e, "dropArea")
        );
        dropContainer.current.removeEventListener("dragleave", handleDragLeave);
      }
    };
  }, [ownerLicense]);

  return (
    <>
      <label htmlFor={id} className='mb-2 block text-sm font-medium'>
        {label}
      </label>
      <div
        className={`${
          dragging
            ? "border border-[#2B92EC] bg-[#EDF2FF]"
            : "border-dashed border-[#e0e0e0]"
        } flex items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5 mb-5`}
        ref={dropContainer}
      >
        <div className='flex-1 flex flex-col'>
          <div className='mx-auto text-gray-400 mb-2'>
            <FaUpload size={18} />
          </div>
          <div className='text-[12px] font-normal text-gray-500'>
            <input
              id={id}
              className='opacity-0 hidden'
              type='file'
              multiple
              accept='image/*'
              ref={fileRef}
              onChange={(e) => handleDrop(e, "inputFile")}
            />
            <span
              className='text-[#4070f4] cursor-pointer'
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              Click to upload
            </span>{" "}
            or drag and drop
          </div>
          <div className='text-[10px] font-normal text-gray-500'>
            Only two files PNG, JPG or JPEG
          </div>
        </div>
      </div>

      {ownerLicense[0].name && (
        <div className='mt-4 mb-4'>
          {ownerLicense.map((img, index) => (
            <div
              className='w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3 flex flex-col'
              key={index}
            >
              <div className='flex justify-between'>
                <div className='w-[70%] flex justify-start items-center space-x-2'>
                  <div className='text-[#5E62FF] text-[37px] cursor-pointer'>
                    {img.type.match(/image.*/i) ? (
                      <FaRegFileImage />
                    ) : (
                      <FaRegFile />
                    )}
                  </div>
                  <div className=' space-y-1'>
                    <div className='text-xs font-medium text-gray-500'>
                      {img.name}
                    </div>
                    <div className='text-[10px] font-medium text-gray-400'>{`${Math.floor(
                      img.size / 1024
                    )} KB`}</div>
                  </div>
                </div>
                <div className='flex-1 flex justify-end'>
                  <div className='space-y-1'>
                    <div
                      className='text-gray-500 text-[17px] cursor-pointer'
                      onClick={() => onDelete()}
                    >
                      <BsX className='ml-auto' />
                    </div>
                    <div className='text-[10px] font-medium text-gray-400'>
                      Done
                    </div>
                  </div>
                </div>
              </div>
              <Image
                className='self-center'
                src={img.photo}
                alt={img.name}
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      )}

      {ownerLicense[0].path && (
        <div className='mt-4 mb-4'>
          <div className='relative w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3 flex flex-col'>
            <div
              className='text-gray-500 text-[17px] cursor-pointer absolute top-2 right-2'
              onClick={() => onDelete()}
            >
              <BsX className='ml-auto' />
            </div>
            <Image
              className='self-center'
              src={`${ownerLicense[0].path}`}
              alt={"brand logo"}
              width={200}
              height={200}
            />{" "}
          </div>
        </div>
      )}
    </>
  );
}
