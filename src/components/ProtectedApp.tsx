import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

export const ProtectedApp: FC = () => {
  const userStore = useUserStore();

  if (userStore.user !== null) return <Outlet />;

  return <Navigate to="/login-google" />;
};
