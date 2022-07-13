import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AdminHome, Application, Login, UserHome } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";
import { Loader } from "./components";
import { useContext } from "react";
import { ContextLoader } from "./Contexts/LoaderContext";
import DashboardCTR from "./containers/dashboard/DashboardCTR";
import Home from "./pages/Home";

function App() {
  const { isLoading } = useContext(ContextLoader);
  
  return (
    <>
      {isLoading && <Loader innerText={"Processing"} />}
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route path={"/application"} element={<Application />} />
        <Route exact path="/admin/*" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
