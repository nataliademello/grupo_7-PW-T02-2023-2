import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useUserStore } from "../stores/userStore";
import { Navigate } from "react-router-dom";

export const RotaLoginComGoogle: FC = () => {
  const userStore = useUserStore();

  if (userStore.user !== null) return <Navigate to="/app" />;

  return (
    <>
      <Helmet>
        <title>Brainz - Login com Google</title>
      </Helmet>
      <main className="screen-center">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img
            src="/brainz/brainz-idea.svg"
            alt="Logo"
            width="180"
            height="180"
          />

          <h1 className="mt-3 fw-bold">Brainz</h1>

          <p className="text-center">
            Explore curiosidades, desafie seu cérebro e
            <br />
            mostre sua sabedoria em nossos desafios de quiz.
          </p>
        </div>

        <button
          onClick={userStore.signInWithGoogle}
          className="btn btn-primary"
        >
          Fazer login com Google
        </button>
      </main>
    </>
  );
};
