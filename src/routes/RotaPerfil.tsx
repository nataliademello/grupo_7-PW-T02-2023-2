import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const RotaPerfil: FC = () => {
  return (
    <>
      <Helmet>
        <title>Brainz - Perfil</title>
      </Helmet>
      <main className="screen-center">
        <div className="text-center">
          <img src="/user-icon.svg" width={150} height={150} alt="Profile" />

        </div>

        <div className="mt-4 d-flex flex-column gap-3 align-items-center">
          <h2 className="fw-bold">NomeDeUsuário</h2>

          <form className="d-flex flex-column gap-3" style={{
            width: "350px"
          }}>
            <div>
              <label htmlFor="nome" className="form-label fw-bold">Nome:</label>
              <input placeholder="Fulano da Silva" type="text" className="form-control" id="nome" name="nome" />
            </div>

            <div>
              <label htmlFor="email" className="form-label fw-bold">E-mail:</label>
              <input placeholder="mail@example.com" type="email" className="form-control" id="email" name="email" />
            </div>

            <div>
              <label htmlFor="senha" className="form-label fw-bold">Senha:</label>
              <input minLength={8} placeholder="********" type="password" className="form-control" id="senha" name="senha" />
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/app" className="btn btn-outline-danger" style={{
                width: "130px"
              }}>
                Cancelar
              </Link>
              <Link to="/app" className="btn btn-primary" style={{
                width: "130px"
              }}>
                Salvar
              </Link>
            </div>
          </form>
        </div>

      </main>
    </>
  )
}