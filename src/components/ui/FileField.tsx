import React, { useState, MouseEvent, useEffect } from "react";
import { useField } from "formik";
import { useDropzone } from "react-dropzone";
import ErrorMessage from "./ErrorMessage";
import { FileItem } from "./FileItem";
import { useDeleteDoc } from "../../apis/cabinet";
import { DocumentRes } from "../../types/document";

interface Props {
  label?: string;
  name: string;
  isMulti?: boolean;
  documents: DocumentRes[],
}

const FileField = ({ label, name, isMulti, documents }: Props) => {
  const deleteDocMutation = useDeleteDoc();
  const [field,, helpers] = useField(name);
  const { setValue } = helpers;

  const [fieldFiles, setFieldFiles] = useState<File[] | string[] | File>();

  useEffect(() => {
    if (field.value) {
      if (isMulti) {
        if (Array.isArray(field.value)) {
          setFieldFiles(field.value);
        } else if (typeof field.value === "string") {
          setFieldFiles([field.value]);
        }
      } else {
        setFieldFiles(field.value);
      }
    } else {
      setFieldFiles(field.value);
    }
  }, [field.value, isMulti]);

  const handleAddFile = (files: File[]) => {
    if (isMulti) {
      setValue([...(fieldFiles as File[]), ...files]);
    } else {
      setValue(files[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxSize: 2000000,
    multiple: !!isMulti,
    onDrop: handleAddFile,
  });

  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    file: File | string,
    index?: number,
  ) => {
    event.stopPropagation();
    if (isMulti && index) {
      const currentDocument = documents[index];
      deleteDocMutation.mutate(currentDocument.id);
    } else {
      setValue(null);
    }
  };

  return (
    <div>
      {label && <label htmlFor="file-input">{label}</label>}
      <div className="FileField rounded-lg mt-3">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="FileField__images min-h-[200px]">
            {isMulti && fieldFiles && (fieldFiles as File[]).length ? (
              (fieldFiles as File[]).map((file: File | string, index) => (
                <FileItem
                  key={typeof file === "string" ? file : file.name}
                  file={file}
                  onDelete={handleDelete}
                  index={index}
                />
              ))
            ) : !isMulti && fieldFiles ? (
              <FileItem
                key={
                  typeof fieldFiles === "string"
                    ? fieldFiles
                    : (fieldFiles as File).name
                }
                file={fieldFiles as File}
                onDelete={handleDelete}
              />
            ) : (
              <p> Drag&apos;n drop file, or click to select file</p>
            )}
          </div>
        </div>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default FileField;
