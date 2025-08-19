import React from "react";
import { useAuth } from "../../context/AuthContext";
import MyTextField from "../../components/TextField/MyTextField";
import MyButton from "../../components/Button/Button";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const [name, setName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigate(); // Assuming useNavigate is imported from react-router-dom
  const { signUp } = useAuth(); // Assuming useAuth is a custom hook for authentication context

  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      window.alert("Please fill in all fields");
      return;
    }
    await signUp(email, password, name);
    navigation("/"); // Redirect to home after successful registration
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-20 p-20">
      <h1 className="mb-4 text-2xl font-bold">Gestionale</h1>
      <div className="mb-6 flex w-100 flex-col items-center justify-center gap-5 text-lg">
        <div className="border-fourtiary flex w-full max-w-md flex-col gap-4 rounded-lg border bg-white p-10 pt-4 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <p className="text-primary-text text-lg font-semibold">
              Registrazione
            </p>
          </div>
          <MyTextField
            labelText="Nome"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <MyButton
            onClick={() => register(email, password, name)}
            variant="primary"
          >
            Registrati
          </MyButton>
          <p className="text-center text-base">
            Hai già un account?{" "}
            <Link to="/login" className="w-full">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
