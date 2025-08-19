import {
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
  SignoutIcon,
} from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Button from "../../components/Button/Button.tsx";
import React from "react";

function AdminNavbar() {
  const { user, signIn, signUp, signOut } = useAuth();
  return (
    <div className="bg-background text-secondary-text border-fourtiary fixed top-0 z-99 flex h-[84px] w-screen flex-row items-center justify-between border-b-1 border-solid px-5 [&_a]:h-full">
      <a href="/">
        <div className="flex h-full items-center justify-center [&_img]:h-full [&_img]:cursor-pointer">
          <img src="/logo.png" alt="" />
        </div>
      </a>

      <div className="bg-hover border-secondary-text relative flex h-[45px] w-[480px] flex-row items-center gap-1.5 rounded-[10px] border-[0.5px] px-[15px]">
        <SearchIcon className="text-secondary h-5 w-5 overflow-visible" />
        <input
          type="text"
          className="text-secondary-text h-full w-full border-none bg-transparent text-[17px] outline-none"
          placeholder="Cerca..."
        />
      </div>

      {user ? (
        <div className="flex items-center justify-between gap-5">
          {" "}
          <div className="hover:bg-second-background flex items-center justify-center rounded-[15px] p-[5px] transition-[background-color] hover:cursor-pointer">
            {" "}
            <SettingsIcon className="h-5 w-5" />
          </div>
          <div className="hover:bg-second-background flex items-center justify-center rounded-[15px] p-[5px] transition-[background-color] hover:cursor-pointer">
            {" "}
            <NotificationIcon className="h-5 w-5" />
          </div>
          <div
            className="hover:bg-second-background flex items-center justify-center rounded-[15px] p-[5px] transition-[background-color] hover:cursor-pointer"
            onClick={signOut}
          >
            {" "}
            <SignoutIcon className="h-5 w-5" />
          </div>
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
            buttonColor="black"
            height="40px"
            onClick={() => signIn("gerri.schiavo@gmail.com", "12345678")}
          >
            Accedi
          </Button>
          <Button
            height="40px"
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
  );
}

export default AdminNavbar;
