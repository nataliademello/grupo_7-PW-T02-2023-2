import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const RotaRedefinirSenha: FC = () => {
  return (
    <>
      <Helmet>
        <title>Brainz - Redefinir senha</title>
      </Helmet>
      <main className="screen-center">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src="/brainz/brainz-thumbs-up.svg" alt="Logo" width="180" height="180" />

          <h1 className="mt-3 fw-bold">Redefinir senha</h1>

          <p className="text-center">
            Digite abaixo sua nova senha e confirme-a.
          </p>
        </div>

        <form className="d-flex flex-column gap-3" style={{
          width: "400px"
        }}>
          <div>
            <label htmlFor="senha" className="form-label fw-bold">Nova senha:</label>
            <input minLength={8} placeholder="********" type="password" className="form-control" id="senha" name="senha" />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="form-label fw-bold">Confirmar senha:</label>
            <input minLength={8} placeholder="********" type="password" className="form-control" id="confirmarSenha" name="confirmarSenha" />
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/login" className="btn btn-primary">
              Redefinir senha
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}