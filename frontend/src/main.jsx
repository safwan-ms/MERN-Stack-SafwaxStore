import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />} />)
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
