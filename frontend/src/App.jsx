import "./App.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";

function App() {
  return (
    <>
      <div className="navbar-container">
        <div className="navigation-container">
          <GrHomeRounded size={20} />
          <IoIosArrowForward size={20} />
          <p className="prova">Dashboard</p>
        </div>
        <div className="search-bar-container"></div>
        <div className="right-content-container">
          {" "}
          <LuSettings size={20} />
          <IoNotifications size={20} />
          <div className="profile-img-container"></div>
        </div>
      </div>
    </>
  );
}

export default App;
