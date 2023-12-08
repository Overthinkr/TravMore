import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./layouts/footer.layout";
import Home from "./pages/Home";
import Companion from "./pages/Companion";
import Discover from "./pages/Discover";
import Invest from "./pages/Invest";
import Profile from "./pages/Profile";
import { LocationContextProvider } from "./contexts/locationContext.context";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/companion", element: <Companion /> },
      { path: "/discover", element: <Discover /> },
      { path: "/invest", element: <Invest /> },
      { path: "/profile", element: <Profile /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <LocationContextProvider>
    <RouterProvider router={router} />
  </LocationContextProvider>
);
