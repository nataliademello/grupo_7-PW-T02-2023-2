import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { findCategoriaByIdentificador } from "../data/categorias";
import { useQuery } from "react-query";
import {
  getPontuacaoPorUsuarioPorCategoria,
  getRankingPorCategoria,
} from "../firebase/dataStore";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useUserStore } from "../stores/userStore";
import { Else, If, Then } from "react-if";

export const RotaRankingCategoria: FC = () => {
  const userStore = useUserStore();
  const { identificadorCategoria } = useParams();
  const { isLoading, data } = useQuery(`rankingCategoria-${identificadorCategoria}`, async () => {
    return {
      ranking: await getRankingPorCategoria(
        parseInt(identificadorCategoria || "0", 10),
      ),
      pontuacaoUsuarioAtual: await getPontuacaoPorUsuarioPorCategoria(
        userStore.user?.uid || "",
        parseInt(identificadorCategoria || "0", 10),
      ),
    };
  });

  if (identificadorCategoria === undefined) return <Navigate to="/app" />;

  const categoria = findCategoriaByIdentificador(
    parseInt(identificadorCategoria, 10),
  );

  if (categoria === undefined) return <Navigate to="/app" />;

  if (isLoading) return <LoadingSpinner />;

  if (data === undefined) return <p>Erro ao carregar ranking.</p>;

  const userIsInTop3 = Boolean(
    data.ranking.find(({ id }) => id === userStore.user?.uid),
  );

  return (
    <>
      <Helmet>
        <title>Brainz - Ranking ({categoria.titulo})</title>
      </Helmet>
      <main className="screen-center">
        <h1 className="fw-bold">Ranking</h1>
        <h2 className="mb-4">{categoria.titulo}</h2>

        <div
          style={{
            width: "450px",
          }}
        >
          <If condition={data.ranking.length > 0}>
            <Then>
              {!userIsInTop3 && (
                <p className="fw-bold">
                  Você está com {data.pontuacaoUsuarioAtual} pontos.
                </p>
              )}

              <ol className="list-group">
                {data.ranking.map((u, indice) => {
                  return (
                    <li
                      key={indice}
                      className="brainz-blue-text list-group-item d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <span className="fw-bold">{indice + 1}. </span>
                        {u.nome} ({u.pontuacao} pontos)
                      </div>

                      {u.id === userStore.user?.uid && (
                        <span className="badge bg-primary rounded-pill">
                          Você!
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </Then>
            <Else>
              <p className="fw-bold text-center">
                Seja o primeiro a jogar nesta categoria!
              </p>
            </Else>
          </If>

          <div
            className="d-flex justify-content-between"
            style={{
              marginTop: "45px",
            }}
          >
            <Link to="/app/categorias" className="btn btn-outline-primary">
              Voltar para o início
            </Link>

            <Link
              to={`/app/categorias/${categoria.identificador}/perguntas`}
              className="btn btn-primary"
            >
              Iniciar quiz
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
