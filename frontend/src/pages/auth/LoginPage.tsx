import React, { useEffect } from "react";
import MyTextField from "../../components/TextField/MyTextField";
import MyButton from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate(); // Assuming useNavigate is imported from react-router-dom
  const { signIn, user } = useAuth(); // Assuming useAuth is a custom hook for authentication context

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if user is already logged in
    }
  }, [user, navigate]);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      window.alert("Please fill in all fields");
      return;
    }
    await signIn(email, password);
    navigate("/");
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-20 p-20">
      <h1 className="mb-4 text-2xl font-bold">Gestionale</h1>
      <div className="mb-6 flex w-100 flex-col items-center justify-center gap-5 text-lg">
        <div className="border-fourtiary flex w-full max-w-md flex-col gap-4 rounded-lg border bg-white p-10 pt-4 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <p className="text-primary-text text-lg font-semibold">Login</p>
          </div>

          <MyTextField
            labelText="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyTextField
            labelText="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="h-2" />

          <MyButton onClick={() => login(email, password)} variant="primary">
            Accedi
          </MyButton>
          <p className="text-center text-base">
            Non hai un account?{" "}
            <Link to="/register" className="w-full">
              Registrati
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
