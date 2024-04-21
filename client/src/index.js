import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ServiceHandlerProvider } from "./context/ServiceHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MantineProvider defaultColorScheme="dark">
      <React.StrictMode>
        <AuthProvider>
          <ServiceHandlerProvider>
            <App />
          </ServiceHandlerProvider>
        </AuthProvider>
      </React.StrictMode>
    </MantineProvider>
  </BrowserRouter>
);
