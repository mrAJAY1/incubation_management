import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoaderContext } from "./Contexts";
import Context from "./constants/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LoaderContext>
      <Context>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Context>
    </LoaderContext>
  </BrowserRouter>
);
