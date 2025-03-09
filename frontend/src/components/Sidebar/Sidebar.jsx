import "./Sidebar.css";

import {
  CustomerIcon,
  DocumentsIcon,
  GraphIcon,
  HomeIcon,
  SupplierIcon,
  WorksIcon,
} from "../../Icon";

function Sidebar() {
  return (
    <div className="sidebar-container">
      
      <div className="bottom-sidebar">
        <div className="menu-container">
          <div className="menu-item">
            <HomeIcon size={30} />
            Dashboard
          </div>
          <div className="menu-item">
            <WorksIcon size={30} />
            Commesse
          </div>
          <div className="menu-item">
            <CustomerIcon size={30} />
            Clienti
          </div>
          <div className="menu-item">
            <SupplierIcon size={30} />
            Fornitori
          </div>
          <div className="menu-item">
            <GraphIcon size={30} />
            Grafici
          </div>
          <div className="menu-item">
            <DocumentsIcon size={30} />
            Documenti
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
