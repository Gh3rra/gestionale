import "./Navbar.css";
import { IoIosArrowForward } from "react-icons/io";

import { HomeIcon, NotificationIcon, SearchIcon, SettingsIcon } from "../../Icon";

function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="logo-container">
        <img src="public/logo.png" alt="" />
      </div>
      <div className="navbar-container">
        <div className="navigation-container">
          <div className="icon-container">
            {" "}
            <HomeIcon size={30} />
          </div>
          <IoIosArrowForward size={20} />
          <p className="prova">Dashboard</p>
        </div>
        <div className="search-bar-container">
          <SearchIcon size={20} className="search-lens" />
          <input type="text" className="search-bar" placeholder="Cerca..." />
        </div>
        {/* <BiSearchAlt size={20} />
          <p>Search</p> */}
        <div />
        <div className="right-content-container">
          {" "}
          <div className="icon-container">
            {" "}
            <SettingsIcon size={30} />
          </div>
          <div className="icon-container">
            {" "}
            <NotificationIcon size={30} />
          </div>
          <div className="profile-img-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
