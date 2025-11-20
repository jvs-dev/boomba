import { useState } from "react";
import "./App.css";
import LoginForm from "./pages/Auth/LoginForm/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm/RegisterForm";
import Home from "./pages/Home/Home";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home" | "login" | "register"

  return (
    <>
      {currentPage === "home" && <Home />}
      {currentPage === "login" && (
        <LoginForm onSwitchToRegister={() => setCurrentPage("register")} />
      )}
      {currentPage === "register" && (
        <RegisterForm onSwitchToLogin={() => setCurrentPage("login")} />
      )}
    </>
  );
}

export default App;
