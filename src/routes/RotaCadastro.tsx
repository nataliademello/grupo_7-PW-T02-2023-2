import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const RotaCadastro: FC = () => {
  return (
    <>
      <Helmet>
        <title>Brainz - Cadastro</title>
      </Helmet>
      <main className="screen-center">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src="/brainz/brainz-idea.svg" alt="Logo" width="180" height="180" />

          <h1 className="fw-bold">
            Brainz
          </h1>

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
            <label htmlFor="nome" className="form-label fw-bold">Nome:</label>
            <input placeholder="Fulano da Silva" type="text" className="form-control" id="nome" name="nome" />
          </div>

          <div>
            <label htmlFor="nomeDeUsuario" className="form-label fw-bold">Nome de usuário:</label>
            <input placeholder="nome_usuario" type="text" className="form-control" id="nomeDeUsuario" name="nomeDeUsuario" />
          </div>

          <div>
            <label htmlFor="email" className="form-label fw-bold">E-mail:</label>
            <input placeholder="mail@example.com" type="email" className="form-control" id="email" name="email" />
          </div>

          <div>
            <label htmlFor="senha" className="form-label fw-bold">Senha:</label>
            <input minLength={8} placeholder="********" type="password" className="form-control" id="senha" name="senha" />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="form-label fw-bold">Confirmar senha:</label>
            <input minLength={8} placeholder="********" type="password" className="form-control" id="confirmarSenha" name="confirmarSenha" />
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/login" className="btn btn-outline-primary" style={{
              width: "130px"
            }}>
              Fazer login
            </Link>
            <Link to="/login" className="btn btn-primary" style={{
              width: "130px"
            }}>
              Criar conta
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}
