import { useParams } from "react-router-dom";
import UploadField from "./UploadField";
import DocTable from "../components/DocTable";
import { useQuery } from "@tanstack/react-query";
import { listDocumentsByDirectory } from "../api/cody";
const CampusContainerFolder = () => {
  useQuery({
    queryKey: ["dir"],
    queryFn: () => listDocumentsByDirectory("1", "123651"),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  console.log("run");
  const { campusName } = useParams();

  return (
    <div className="flex-1 grid">
      <div className="w-[85%] mx-auto h-fit my-10 p-3 space-y-5 grid gap-7">
        <p className="text-gray-700 font-medium uppercase bg-gray-200/60 w-fit px-5 py-3">
          {campusName}
        </p>

        <div className="w-[65%] mx-auto space-y-10">
          <div>
            <p className="font-semibold">Create Documents</p>
            <p>
              You can create a new document in this folder by writing, uploading
              an existing document or importing a webpage.
            </p>
            <p></p>
          </div>
          <UploadField />
          <DocTable />
        </div>
      </div>
    </div>
  );
};

export default CampusContainerFolder;
