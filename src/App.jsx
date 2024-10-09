import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet className="border border-black" />
    </div>
  );
};

export default App;
