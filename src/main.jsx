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
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/home", element: <Home /> },
  { path: "/companion", element: <Companion /> },
  { path: "/discover", element: <Discover /> },
  { path: "/invest", element: <Invest /> },
  { path: "/profile", element: <Profile /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
