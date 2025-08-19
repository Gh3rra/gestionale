import React from "react";
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
    <div className="bg-background text-secondary-text border-r-fourtiary [&_svg]:text-secondary-text fixed mt-[84px] flex h-screen w-[346px] min-w-[346px] flex-col border-r-1">
      <div className="flex w-full flex-col items-center justify-center p-5">
        <div className="flex w-full flex-col items-start justify-center gap-5 p-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="hover:bg-second-background flex w-full items-center gap-[15px] rounded-[10px] p-[15px] !text-[18px] font-normal hover:cursor-pointer">
              <HomeIcon className="h-5 w-5" />
              <p className="text-secondary-text"> Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="/commissions"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="hover:bg-second-background flex w-full items-center gap-[15px] rounded-[10px] p-[15px] !text-[18px] font-normal hover:cursor-pointer">
              <WorksIcon className="h-5 w-5" />
              <p className="text-secondary-text"> Commesse</p>
            </div>
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="hover:bg-second-background flex w-full items-center gap-[15px] rounded-[10px] p-[15px] !text-[18px] font-normal hover:cursor-pointer">
              <CustomerIcon className="h-5 w-5" />
              <p className="text-secondary-text"> Clienti</p>
            </div>
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="hover:bg-second-background flex w-full items-center gap-[15px] rounded-[10px] p-[15px] !text-[18px] font-normal hover:cursor-pointer">
              <SupplierIcon className="h-5 w-5" />
              <p className="text-secondary-text"> Fornitori</p>
            </div>
          </NavLink>{" "}
          <NavLink
            to="/graphs"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="hover:bg-second-background flex w-full items-center gap-[15px] rounded-[10px] p-[15px] !text-[18px] font-normal hover:cursor-pointer">
              <GraphIcon className="w-5" />
              <p className="text-secondary-text"> Grafici</p>
            </div>
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              isActive ? "[&>div]:bg-second-background w-full" : "w-full"
            }
          >
            <div className="hover:bg-second-background flex w-full items-center gap-[15px] rounded-[10px] p-[15px] !text-[18px] font-normal hover:cursor-pointer">
              <DocumentsIcon className="h-5 w-5" />
              <p className="text-secondary-text"> Documenti</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
