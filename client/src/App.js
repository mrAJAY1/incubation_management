import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";
import { Loader } from "./components";
import { useContext } from "react";
import { ContextLoader } from "./Contexts/LoaderContext";
function App() {
  const { isLoading ,setLoading} = useContext(ContextLoader);
  return (
    <>
      {isLoading && <Loader innerText={"Processing"} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
