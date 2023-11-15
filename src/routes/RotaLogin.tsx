import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const RotaLogin: FC = () => {
  return (
    <>
      <Helmet>
        <title>Brainz - Login</title>
      </Helmet>
      <main className="screen-center">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src="/brainz/brainz-idea.svg" alt="Logo" width="180" height="180" />

          <h1 className="mt-3 fw-bold">Brainz</h1>

          <p className="text-center">
            Explore curiosidades, desafie seu cérebro e
            <br />
            mostre sua sabedoria em nossos desafios de quiz.
          </p>
        </div>

        <form className="d-flex flex-column gap-3" style={{
          width: "350px"
        }}>
          <div>
            <label htmlFor="email" className="form-label fw-bold">E-mail:</label>
            <input placeholder="mail@example.com" type="email" className="form-control" id="email" name="email" />
          </div>

          <div>
            <label htmlFor="senha" className="form-label fw-bold">Senha:</label>
            <input minLength={8} placeholder="********" type="password" className="form-control" id="senha" name="senha" />
            <div className="text-end ">
              <Link to="/esqueci-minha-senha" className="form-text">
                Esqueci minha senha
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/cadastro" className="btn btn-outline-primary" style={{
              width: "130px"
            }}>
              Criar conta
            </Link>
            <Link to="/app/categorias" className="btn btn-primary" style={{
              width: "130px"
            }}>
              Entrar
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}