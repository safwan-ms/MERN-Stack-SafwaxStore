import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";

//Private Route
import PrivateRoutes from "./components/PrivateRoutes.jsx";

//Auth
import Login from "./pages/Auth/Login.jsx";
import Profile from "./pages/User/Profile.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Register from "./pages/Auth/Register.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
