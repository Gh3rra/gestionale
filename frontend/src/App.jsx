import "./App.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";


function App() {
  return (
    <><div className="bar-wrapper">
      <div className="sidebar-container">


      </div>
      <div className="navbar-container">
        <div className="navigation-container">
          <GrHomeRounded size={20} />
          <IoIosArrowForward size={20} />
          <p className="prova">Dashboard</p>
        </div>
         <input type="search" className="search-bar-container" placeholder="Cerca"/>
          {/* <BiSearchAlt size={20} />
          <p>Search</p> */}
        
        <div className="right-content-container">
          {" "}
          <LuSettings size={20} />
          <IoNotifications size={20} />
          <div className="profile-img-container"></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
