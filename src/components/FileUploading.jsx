import { FaFile } from "react-icons/fa";

const FileUploading = ({ file, loadingState }) => {
  const styles = {
    container: `border-2 p-5 space-y-4 rounded-md
      ${
        loadingState === "uploading"
          ? "border-violet-300 bg-violet-100/90"
          : loadingState === "transforming"
          ? "border-yellow-300 bg-yellow-100/80"
          : loadingState === "learning"
          ? "border-green-400 bg-green-100/70"
          : "hover:border-violet-700"
      }
    `,
    icon: `text-[1.5rem] ${
      loadingState === "uploading"
        ? "text-violet-800"
        : loadingState === "transforming"
        ? "text-yellow-600"
        : loadingState === "learning"
        ? "text-green-500"
        : "text-violet-800"
    }`,
    statusText: `uppercase absolute z-10 px-5 ${
      loadingState === "uploading"
        ? "text-violet-800 bg-violet-100"
        : loadingState === "transforming"
        ? "text-yellow-700 bg-yellow-100"
        : loadingState === "learning"
        ? "text-green-600 bg-green-100"
        : "text-violet-800"
    }`,
    progressBarContainer: `h-1.5 w-full overflow-hidden ${
      loadingState === "uploading"
        ? "bg-violet-500/90"
        : loadingState === "transforming"
        ? "bg-yellow-500/90"
        : loadingState === "learning"
        ? "bg-green-500"
        : "bg-violet-500/90"
    }`,
    progressBar: "animate-progress w-full h-full bg-gray-300 origin-left-right",
  };

  const getStatusText = () => {
    if (loadingState === "uploading") return "File Uploading...";
    if (loadingState === "learning") return "Transforming...";
    return "Learning...";
  };

  return (
    <div className={styles.container}>
      <div className="flex items-center gap-3">
        <FaFile className={styles.icon} />
        <div>
          <p className="font-medium ">{file?.name}</p>
        </div>
      </div>

      <div className="relative grid place-items-center">
        <p className={styles.statusText}>{getStatusText()}</p>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}></div>
        </div>
      </div>
    </div>
  );
};

export default FileUploading;
