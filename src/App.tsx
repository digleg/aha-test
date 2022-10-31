import React from "react";
import "./App.css";
import Home from "./pages/home";
import Tags from "./pages/tags";
import PasswordInput from "./pages/passwordInput";
import AdvancedEffect from "./pages/advancedEffect";

import SideBar from "./components/SideBar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/tags",
      element: <Tags />,
    },
    {
      path: "/passwordInput",
      element: <PasswordInput />,
    },
    {
      path: "/advancedEffect",
      element: <AdvancedEffect />,
    },
  ]);
  return (
    <React.StrictMode>
      <div style={{ display: "flex" }}>
        <SideBar />
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}

export default App;
