import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, UserHome } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";
import { Loader } from "./components";
import { useContext } from "react";
import { ContextLoader } from "./Contexts/LoaderContext";

function App() {
  const { isLoading } = useContext(ContextLoader);
  return (
    <>
      {isLoading && <Loader innerText={"Processing"} />}
      <Routes>
        <Route path="*" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
