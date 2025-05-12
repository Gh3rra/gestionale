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
    <div className="fixed mt-[84px] h-screen w-[346px] min-w-[346px] flex flex-col bg-background text-secondary-text border-r-1 border-r-fourtiary">
      <div className="w-full flex flex-col justify-center items-center p-5">
        <div className="w-full flex flex-col justify-center items-start p-5 gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="w-full rounded-[10px] flex items-center gap-[15px] p-[15px] !text-[18px] font-normal  hover:cursor-pointer hover:bg-second-background">
              <HomeIcon size={30} />
              <p className="text-secondary-text"> Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="/commissions"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="w-full rounded-[10px] flex items-center gap-[15px] p-[15px] !text-[18px] font-normal  hover:cursor-pointer hover:bg-second-background">
              <WorksIcon size={30} />
              <p className="text-secondary-text"> Commesse</p>
            </div>
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="w-full rounded-[10px] flex items-center gap-[15px] p-[15px] !text-[18px] font-normal  hover:cursor-pointer hover:bg-second-background">
              <CustomerIcon size={30} />
              <p className="text-secondary-text"> Clienti</p>
            </div>
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="w-full rounded-[10px] flex items-center gap-[15px] p-[15px] !text-[18px] font-normal  hover:cursor-pointer hover:bg-second-background">
              <SupplierIcon size={30} />
              <p className="text-secondary-text"> Fornitori</p>
            </div>
          </NavLink>{" "}
          <NavLink
            to="/graphs"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="w-full rounded-[10px] flex items-center gap-[15px] p-[15px] !text-[18px] font-normal  hover:cursor-pointer hover:bg-second-background">
              <GraphIcon size={30} />
              <p className="text-secondary-text"> Grafici</p>
            </div>
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="w-full rounded-[10px] flex items-center gap-[15px] p-[15px] !text-[18px] font-normal  hover:cursor-pointer hover:bg-second-background">
              <DocumentsIcon size={30} />
              <p className="text-secondary-text"> Documenti</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
