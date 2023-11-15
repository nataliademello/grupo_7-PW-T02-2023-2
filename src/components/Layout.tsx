import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FC, useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";
import { LoadingSpinner } from "./LoadingSpinner";

export const Layout: FC = () => {
  const userStore = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) userStore.setUser(user);

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <div className="container mb-3">
        <Outlet />
      </div>
    </>
  );
};
