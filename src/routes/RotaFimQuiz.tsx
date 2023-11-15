import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export const RotaFimQuiz: FC = () => {
  return (
    <>
      <Helmet>
        <title>Brainz - Fim do quiz</title>
      </Helmet>
      <main className="screen-center">
        <div className="text-center">
          <img src="/brainz/brainz-thumbs-up.svg" width={180} height={180} alt="Placeholder" />
        </div>

        <div className="mt-3 d-flex flex-column gap-3 align-items-center">
          <h2 className="fw-bold">Você acertou 10/10!</h2>

          <p className="text-center">
            Parabéns pela pontuação! Você claramente
            <br />
            sabe do que está falando. Quer descobrir
            <br />
            as respostas por trás das perguntas?
          </p>

          <div className="d-flex gap-4">
            <Link to="/app/categorias" style={{
              width: "210px"
            }} className="btn btn-outline-primary">
              Voltar para o início
            </Link>

            <Link to="/app/categorias/categoria-tal/respostas" style={{
              width: "210px"
            }} className="btn btn-primary">
              Quero ver as respostas!
            </Link>
          </div>
        </div>

      </main>
    </>
  )
}