import React, { useEffect, useState, MouseEvent } from "react";
import { IMAGE_URL } from "../../apis/utils";

interface Props {
  file: File | string;
  onDelete: (event: MouseEvent<HTMLButtonElement>, file: File | string, index?: number) => void;
  index?: number,
}

export const FileItem = ({ file, onDelete, index }: Props) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (typeof file === "string") {
      setPreview(`${IMAGE_URL}/${file}`);
    } else {
      convertToBase64(file);
    }
  }, [file]);

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result as string);
    };
  };

  return (
    <div className="FileField__imageConteiner">
      <img className="FileField__image" src={preview} alt="preview" />
      <button type="button" className="FileField__delete" onClick={(e) => onDelete(e, file, index)}>
        X
      </button>
    </div>
  );
};
