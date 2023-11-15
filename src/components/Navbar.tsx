import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

export const Navbar: FC = () => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.user !== null;
  const navigate = useNavigate();

  return (
    <nav className="navbar brainz-blue-bg text-white">
      <div className="container-fluid">
        <Link
          to="/app/categorias"
          className="ms-2 navbar-brand d-flex align-items-center gap-2 text-white"
        >
          <img
            src="/brainz/brainz-idea.svg"
            alt="Logo"
            width="36"
            height="36"
            className="d-inline-block align-text-top"
          />
          Brainz
        </Link>

        <div className="d-flex align-items-center gap-4 me-2">
          {isLoggedIn ? (
            <button
              className="raw-button text-decoration-underline p-2"
              onClick={async () => {
                await userStore.signOut();
                navigate("/login-google");
              }}
            >
              Sair
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
