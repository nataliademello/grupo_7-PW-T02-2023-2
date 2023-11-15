import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { Categoria, categorias } from "../data/categorias";

const CardCategoria: FC<Categoria> = (props) => {
  return (
    <div className="card text-center brainz-blue-text h-100">
      <img
        src="/brainz/image-placeholder.svg"
        height={180}
        width={180}
        className="card-img-top"
        alt="Placeholder"
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">
          <Link
            to={"/app/categorias/" + props.identificador}
            className="stretched-link text-decoration-none brainz-blue-text"
          >
            {props.titulo}
          </Link>
        </h5>

        <p className="card-text">{props.descricao}</p>
      </div>
    </div>
  );
};

export const RotaCategorias: FC = () => {
  const userStore = useUserStore();
  const user = userStore.user;

  return (
    <>
      <Helmet>
        <title>Brainz - Categorias</title>
      </Helmet>
      <main className="mt-5 d-flex flex-column gap-3 align-items-center justify-content-center">
        <h2>Bem vindo(a), {user?.displayName}!</h2>
        <h1 className="text-center fw-bold">Categorias</h1>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {categorias.map((categoria, indice) => {
            return (
              <div key={indice} className="col">
                <CardCategoria {...categoria} />
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
