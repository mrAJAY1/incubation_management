import "./App.css";
import { Routes, Route } from "react-router-dom";
import {Login} from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login/>} />
      <Route path="/signup" element={ <Signup/>} />
    </Routes>
 
  );
}

export default App;
