import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

type PropsCardResposta = {
  numero: number;
  pergunta: string;
  resposta: string;
}

const CardResposta: FC<PropsCardResposta> = (props) => {
  return (
    <div className="card brainz-blue-text">
      <div className="card-body">
        <h5 className="card-title fw-bold">
          {props.numero}. {props.pergunta}
        </h5>
        <p className="card-text">
          {props.resposta}
        </p>
      </div>
    </div>
  )
}

function range(size: number) {
  return Array.from({ length: size }).map((_, i) => i)
}

export const RotaRespostas: FC = () => {
  const respostas: PropsCardResposta[] = range(10).map((i) => {
    return {
      numero: i + 1,
      pergunta: "Pergunta Inserida Aqui",
      resposta: "Nam nec accumsan arcu justo magna. Faucibus ut mollis id pellentesque imperdiet aenean amet. Aliquet."
    }
  })

  return (
    <>
      <Helmet>
        <title>Brainz - Respostas (Categoria Tal)</title>
      </Helmet>
      <main className="d-flex flex-column align-items-center mt-5">
        <h1 className="fw-bold">Respostas</h1>

        <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
          {respostas.map((resposta) => {
            return (
              <div className="col" key={resposta.numero}>
                <CardResposta {...resposta} />
              </div>
            )
          })}
        </div>

        <div className="mt-4 d-flex justify-content-end gap-3 w-100">
          <Link to="/app/categorias" className="btn btn-outline-primary">
            Voltar para o início
          </Link>

          <Link to="/app/categorias/categoria-tal/ranking" className="btn btn-primary">
            Ver ranking
          </Link>
        </div>
      </main>
    </>
  )
}