import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";

import {
  HomeIcon,
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
  SignoutIcon,
} from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Button from "../../components/Button/Button.tsx";
import IconButton from "../../components/IconButton/IconButton.tsx";
import React, { JSX } from "react";

type Breadcrumb = {
  label: string;
  path: string;
  icon?: JSX.Element;
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const buildBreadcrumbs = (pathname: string) => {
    const breadcrumbs: Breadcrumb[] = [
      {
        label: "Home",
        path: "/",
        icon: (
         
            <HomeIcon className="h-5 w-5" />
        
        ),
      },
    ];

    const parts = pathname.split("/").filter(Boolean); // rimuove stringhe vuote

    if (parts[0] === "customers") {
      breadcrumbs.push({ label: "Clienti", path: "/customers" });

      if (parts[1]) {
        breadcrumbs.push({ label: "Dettaglio", path: pathname });
      }
    } else if (parts[0] === "commissions") {
      breadcrumbs.push({ label: "Commesse", path: "/commissions" });

      if (parts[1]) {
        breadcrumbs.push({ label: "Dettaglio", path: pathname });
      }
    } else if (parts[0] === "suppliers") {
      breadcrumbs.push({ label: "Fornitori", path: "/suppliers" });

      if (parts[1]) {
        breadcrumbs.push({ label: "Dettaglio", path: pathname });
      }
    } else if (parts[0] === "add-commission") {
      breadcrumbs.push({ label: "Nuova Commessa", path: "/add-commission" });
    } else if (parts[0] === "graphs") {
      breadcrumbs.push({ label: "Grafici", path: "/graphs" });
    } else if (parts[0] === "docs") {
      breadcrumbs.push({ label: "Documenti", path: "/docs" });
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  const { user, signIn, signUp, signOut } = useAuth();
  return (
    <div className="bg-background text-secondary-text border-fourtiary [&_svg]:text-secondary-text fixed top-0 z-99 flex h-[84px] w-screen flex-row items-center border-b-1 border-solid">
      <a href="/" className="h-full">
        <div className="border-fourtiary flex h-full min-w-[346px] items-center justify-center border-r-1 border-solid [&_img]:h-full [&_img]:cursor-pointer">
          <img src="/logo.png" alt="" />
        </div>
      </a>
      <div className="flex h-full w-full items-center justify-between px-[20px]">
        <div className="flex w-3/5 flex-row justify-between">
          <div className="flex flex-row items-center gap-2.5">
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <IconButton
                  onClick={() =>
                    index === breadcrumbs.length - 1
                      ? null
                      : navigate(breadcrumb.path)
                  }
                >
                  {breadcrumb.icon || (
                    <p
                      onClick={() =>
                        index === breadcrumbs.length - 1
                          ? null
                          : navigate(index - (breadcrumbs.length - 1))
                      }
                    >
                      {breadcrumb.label}
                    </p>
                  )}
                </IconButton>

                {index < breadcrumbs.length - 1 && (
                  <IoIosArrowForward size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="bg-hover border-secondary-text relative flex h-[45px] w-[480px] flex-row items-center gap-1.5 rounded-[10px] border-[0.5px] px-[15px]">
            <SearchIcon className="!text-secondary h-5 w-5 overflow-visible" />
            <input
              type="text"
              className="text-secondary-text h-full w-full border-none bg-transparent text-[17px] outline-none"
              placeholder="Cerca..."
            />
          </div>
        </div>
        {user ? (
          <div className="flex items-center justify-between gap-5">
            {" "}
            <IconButton>
              {" "}
              <SettingsIcon className="h-5 w-5" />
            </IconButton>
            <IconButton>
              {" "}
              <NotificationIcon className="h-5 w-5" />
            </IconButton>
            <IconButton onClick={signOut}>
              {" "}
              <SignoutIcon className="h-5 w-5" />
            </IconButton>
            <div className="border-fourtiary border- h-12.5 w-12.5 overflow-hidden rounded-full bg-white">
              <img
                className="h-full w-full object-contain"
                src={user.profileImg}
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-5">
            {" "}
            <Button
              onClick={() => signIn("gerri.schiavo@gmail.com", "12345678")}
            >
              Accedi
            </Button>
            <Button
              onClick={() =>
                signUp(
                  "gerri.schiavo@gmail.com",
                  "12345678",
                  "Meridional Serramenti SRL",
                  "https://i.imgur.com/vfDpIXK.png",
                )
              }
            >
              Registrati
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
