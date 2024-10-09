import { FaFolder } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CampusFolder = ({ campusFolder, setSelectedFolder }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/campus/${campusFolder.name}`);
    setSelectedFolder(campusFolder);
  };

  return (
    <div
      className="bg-gray-200/60 p-5 rounded-md cursor-pointer hover:bg-gray-300/60"
      onClick={handleClick}
    >
      <div className="flex gap-3 items-center">
        <FaFolder className="text-gray-500" />
        <p className="font-medium text-gray-700 uppercase text-[0.9rem] select-none">
          {campusFolder.name}
        </p>
      </div>
    </div>
  );
};

export default CampusFolder;
