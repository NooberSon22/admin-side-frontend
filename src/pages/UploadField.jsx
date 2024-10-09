import { FaPenNib } from "react-icons/fa";
import { FaUpload, FaLink } from "react-icons/fa6";
import DocField from "../components/DocField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import folderStore from "../data/folder";
import {
  createDocumentRecord,
  getUploadURL,
  uploadFileToURL,
} from "../api/cody";
import FileUploading from "@/components/FileUploading";

const UploadField = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const queryClient = useQueryClient();
  const { selectedFolder } = folderStore((state) => state);
  const handleUpload = () => fileRef.current?.click();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUploading(true);
      handleGetUploadURL();
    }
  };

  const { mutate: handleGetUploadURL, isPending: uploadURLPending } =
    useMutation({
      mutationFn: () => getUploadURL(file.name, file.type),
      onSuccess: ({ url, key }) => {
        console.log("Upload URL retrieved successfully:", { url, key });
        handleUploadToURL({ url, key });
      },
      onError: (error) => {
        console.error("Error retrieving upload URL:", error);
        setFileUploading(false);
      },
    });

  const { mutate: handleUploadToURL, isPending: uploadFilePending } =
    useMutation({
      mutationFn: ({ url, key }) => uploadFileToURL(url, key, file.type, file),
      onSuccess: ({ key }) => {
        console.log("File uploaded successfully:", key);
        handleSaveFileRecord(key);
      },
      onError: (error) => {
        console.error("Error uploading file:", error);
        setFileUploading(false);
      },
    });

  const { mutate: handleSaveFileRecord, isPending: saveFilePending } =
    useMutation({
      mutationFn: (key) => createDocumentRecord(selectedFolder.id, key),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["docs", selectedFolder.id],
        });
      },
      onError: (error) => {
        console.error("Error saving file record:", error);
        setFileUploading(false);
      },
      onSettled: () => {
        setFile(null);
        setFileUploading(false);
      },
    });

  const determineLoadingState = () => {
    if (uploadURLPending) return "uploading";
    if (uploadFilePending) return "transforming";
    if (saveFilePending) return "learning";
    return null;
  };

  return (
    <div className="space-y-7">
      <div className="flex justify-between gap-7">
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={handleFileChange}
        />

        <DocField
          icon={<FaPenNib className="text-[1.7rem] text-blue-900" />}
          mainLabel="Write"
          subLabel="Write or copy-paste your document"
        />

        <DocField
          icon={<FaUpload className="text-[1.7rem] text-blue-900" />}
          mainLabel="Upload"
          subLabel="Upload PDF, Word, or PowerPoint files"
          handleUpload={handleUpload}
        />

        <DocField
          icon={<FaLink className="text-[1.7rem] text-blue-900" />}
          mainLabel="Import"
          subLabel="Import website with text content"
        />
      </div>

      {fileUploading && (
        <FileUploading file={file} loadingState={determineLoadingState()} />
      )}
    </div>
  );
};

export default UploadField;
