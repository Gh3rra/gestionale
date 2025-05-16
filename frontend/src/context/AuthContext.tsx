import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  profileImg: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => void;
  signUp: (
    email: string,
    password: string,
    name: string,
    profileImg: string
  ) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/user", { withCredentials: true })
      .then((res) => {
        if (res.status !== 200) {
          setUser(null);
          return;
        }
        setUser(res.data.user);
      });
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (res.status !== 200) {
      window.alert("Invalid credentials");
      return;
    }
    setUser(res.data.user);

    //supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    profileImg: string
  ) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        email,
        password,
        name,
        profileImg,
      },
      { withCredentials: true }
    );
    if (res.status !== 201) {
      window.alert("Error signing up");
      return;
    }
    setUser(res.data.user);
  };
  const signOut = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    if (res.status !== 200) {
      window.alert("Error signing out");
      return;
    }
    setUser(null);
    //supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
