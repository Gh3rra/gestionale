import { JSX } from "react";
import Button from "../../../components/Button/Button";
import {
  CrossIcon,
  ExcelIcon,
  Mp4Icon,
  PdfIcon,
  PngIcon,
  TextFileIcon,
  UnknownIcon,
  WordIcon,
  ZipIcon,
} from "../../../Icon";
import "../AddCommission.css";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

function DocumentsStep() {
  const { getValues, setValue, watch } = useFormContext();
  const files = (watch("documents") as File[]) ?? [];

  const selectDocument = (documents: File[]) => {
    /* const updated = current.some((s) => supplierId === s.id)
      ? current.filter((s) => supplierId !== s.id)
      : [...current, { id: supplierId, expenses: [] }];
 */
    const current = getValues("documents") ?? [];

    const updated = [...current, ...documents];

    setValue("documents", updated);
  };

  const deleteDocument = (index: number) => {
    const current: File[] = getValues("documents") ?? [];

    const updated = current.filter((_, i) => i !== index);

    setValue("documents", updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      selectDocument(files);
    },
  });

  return (
    <div className="flex flex-col gap-5 h-full max-h-full justify-start pr-5 mb-5">
      <div className="font-semibold !text-[25px]">Inserisci i documenti</div>
      <div
        {...getRootProps({
          className: `${
            isDragActive ? "dashed-border-active" : "dashed-border"
          }  w-full h-[200px] bg-hover rounded-[15px]`,
        })}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <div className="flex flex-col  items-center justify-center h-full  gap-[15px]">
            <div className="font-medium">Lascia qua</div>
          </div>
        ) : (
          <div className="flex flex-col  items-center justify-center h-full  gap-[15px]">
            <div className="font-medium">Trascina in documenti qui</div>
            <div className="text-secondary-text">oppure</div>
            <Button height={"40px"}>Seleziona file dal computer</Button>{" "}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full gap-2 px-2 ">
        {files.map((e, index) => (
          <div className="flex gap-2 items-center rounded-[10px] bg-hover border-1 border-fourtiary w-fit px-[10px] py-[5px]">
            {iconFromFile(e)}

            <p>{e.name}</p>
            <button
              onClick={() => deleteDocument(index)}
              className="hover:cursor-pointer rounded-[9px]  hover:bg-fourtiary p-1.5 transition-all duration-300"
            >
              <CrossIcon size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function iconFromFile(file: File): JSX.Element {
  const ext = file.name.split(".").pop() ?? "";
  switch (ext) {
    case "pdf":
      return <PdfIcon />;
    case "xlsx":
      return <ExcelIcon />;
    case "doc":
    case "docx":
      return <WordIcon />;
    case "txt":
      return <TextFileIcon />;
    case "rar":
    case "zip":
      return <ZipIcon />;

    case "png":
    case "jpeg":
    case "jpg":
    case "avif":
      return <PngIcon />;
    case "mp4":
    case "mkv":
    case "avi":
      return <Mp4Icon />;
    default:
      return <UnknownIcon />;
  }
}

export default DocumentsStep;
