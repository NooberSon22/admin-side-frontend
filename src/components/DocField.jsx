const DocField = ({ icon, mainLabel, subLabel, handleUpload }) => {
  return (
    <div
      className="border-2 flex-1 p-5 rounded-md cursor-pointer select-none border-blue-300 bg-blue-100 hover:border-blue-700"
      onClick={handleUpload}
    >
      <div className="mb-5">{icon}</div>
      <p className="text-[1.1rem] font-medium mb-1">{mainLabel}</p>
      <p className="text-[0.95rem]">{subLabel}</p>
    </div>
  );
};

export default DocField;
