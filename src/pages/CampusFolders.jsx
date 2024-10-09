import { useQuery } from "@tanstack/react-query";
import CampusFolder from "../components/CampusFolder";
import { listFolders } from "../api/cody";
import Spinner from "@/components/Spinner";
import folderStore from "@/data/folder";

// const CAMPUS = [
//   "Angono",
//   "Antipolo",
//   "Binangonan",
//   "Cainta",
//   "Cardona",
//   "Morong",
//   "Pililla",
//   "Rodriguez",
//   "Tanay",
//   "Taytay",
// ];

const CampusFolders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["campus"],
    queryFn: () => listFolders(),
  });
  const { setSelectedFolder } = folderStore((state) => state);

  return (
    <div className="flex-1">
      <div className="w-[85%] mx-auto h-fit my-20 p-3 flex">
        {!isLoading ? (
          <ul className="w-full grid grid-cols-4 gap-7">
            {data?.map((campusFolder) => (
              <CampusFolder
                key={campusFolder.id}
                campusFolder={campusFolder}
                setSelectedFolder={setSelectedFolder}
              />
            ))}
          </ul>
        ) : (
          <div className="w-full grid place-items-center py-60">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusFolders;
