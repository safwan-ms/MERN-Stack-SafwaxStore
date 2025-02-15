import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import AdminMenu from "./AdminMenu";
const AdminRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <>
      <Outlet />
      {userInfo.isAdmin && <AdminMenu />}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoutes;
