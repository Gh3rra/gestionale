import {
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
  SignoutIcon,
} from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Button from "../../components/Button/Button.tsx";

function AdminNavbar() {
  const { user, signIn, signUp, signOut } = useAuth();
  return (
    <div className="fixed top-0 z-99 bg-background h-[84px] w-screen flex flex-row items-center justify-between text-secondary-text [&_a]:h-full border-b-1 border-fourtiary border-solid px-5">
      <a href="/">
        <div className="flex  h-full items-center justify-center [&_img]:h-full [&_img]:cursor-pointer ">
          <img src="/logo.png" alt="" />
        </div>
      </a>

      <div className="relative w-[480px] h-[45px] rounded-[10px] flex flex-row items-center px-[15px] gap-1.5 border-[0.5px] bg-hover border-secondary-text">
        <SearchIcon size={20} />
        <input
          type="text"
          className="outline-none border-none bg-transparent w-full h-full text-secondary-text text-[17px]"
          placeholder="Cerca..."
        />
      </div>

      {user ? (
        <div className="flex justify-between items-center gap-5">
          {" "}
          <div className="flex items-center justify-center p-[5px] rounded-[15px] hover:cursor-pointer hover:bg-second-background transition-[background-color]">
            {" "}
            <SettingsIcon size={30} />
          </div>
          <div className="flex items-center justify-center p-[5px] rounded-[15px] hover:cursor-pointer hover:bg-second-background transition-[background-color]">
            {" "}
            <NotificationIcon size={30} />
          </div>
          <div
            className="flex items-center justify-center p-[5px] rounded-[15px] hover:cursor-pointer hover:bg-second-background transition-[background-color]"
            onClick={signOut}
          >
            {" "}
            <SignoutIcon size={30} />
          </div>
          <div className="w-12.5 h-12.5 rounded-full bg-white border-fourtiary border- overflow-hidden ">
            <img
              className="h-full w-full object-contain"
              src={user.profileImg}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-5">
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
                "https://i.imgur.com/vfDpIXK.png"
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
