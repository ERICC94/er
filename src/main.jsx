import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/App.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { HashRouter } from "react-router-dom";
import { EmpleadoProvider } from "./EmpleadoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ProSidebarProvider>
      <EmpleadoProvider>
        <App />
      </EmpleadoProvider>
    </ProSidebarProvider>
  </HashRouter>
);
