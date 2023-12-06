import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./layouts/footer.layout";
import Home from "./pages/home";
import Companion from "./pages/companion";
import Discover from "./pages/discover";
import Invest from "./pages/invest";
import Profile from "./pages/profile";
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
