import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const RotaEsqueciSenha: FC = () => {
  return (
    <>
      <Helmet>
        <title>Brainz - Esqueci minha senha</title>
      </Helmet>
      <main className="screen-center">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src="/brainz/brainz-question-mark.svg" alt="Logo" width="180" height="180" />

          <h1 className="mt-3 fw-bold">Esqueceu sua senha?</h1>

          <p className="text-center">
            Não se preocupe! Informe seu e-mail e enviaremos
            <br />
            um link para você redefinir sua senha.
          </p>
        </div>

        <form className="d-flex flex-column gap-3" style={{
          width: "400px"
        }}>
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="mail@example.com" />
            <Link to="/login" className="btn btn-outline-primary" type="button">Enviar link</Link>
          </div>
        </form>
      </main>
    </>
  )
}