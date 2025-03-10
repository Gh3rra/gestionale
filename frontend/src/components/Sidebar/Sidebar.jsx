import "./Sidebar.css";

import {
  CustomerIcon,
  DocumentsIcon,
  GraphIcon,
  HomeIcon,
  SupplierIcon,
  WorksIcon,
} from "../../Icon";
import { NavLink } from "react-router";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="bottom-sidebar">
        <div className="menu-container">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <div className="menu-item">
              <HomeIcon size={30} />
              Dashboard
            </div>
          </NavLink>
          <NavLink
            to="/commissions"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <div className="menu-item">
              <WorksIcon size={30} />
              Commesse
            </div>
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <div className="menu-item">
              <CustomerIcon size={30} />
              Clienti
            </div>
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <div className="menu-item">
              <SupplierIcon size={30} />
              Fornitori
            </div>
          </NavLink>{" "}
          <NavLink
            to="/graphs"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <div className="menu-item">
              <GraphIcon size={30} />
              Grafici
            </div>
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <div className="menu-item">
              <DocumentsIcon size={30} />
              Documenti
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
