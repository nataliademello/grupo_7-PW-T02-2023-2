import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from "react-router-dom";
import { ProtectedApp } from "../components/ProtectedApp.tsx";
// import { RotaLogin } from './RotaLogin.tsx';
// import { RotaCadastro } from './RotaCadastro.tsx';
// import { RotaEsqueciSenha } from './RotaEsqueciSenha.tsx';
// import { RotaRedefinirSenha } from './RotaRedefinirSenha.tsx';
// import { RotaPerfil } from './RotaPerfil.tsx';
import { RotaCategorias } from "./RotaCategorias.tsx";
import { RotaPergunta } from "./RotaPergunta.tsx";
import { RotaFimQuiz } from "./RotaFimQuiz.tsx";
import { RotaRespostas } from "./RotaRespostas.tsx";
import { RotaRankingCategoria } from "./RotaRankingCategoria.tsx";
import { Layout } from "../components/Layout.tsx";
import { RotaLoginComGoogle } from "./RotaLoginComGoogle.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route path="login/" element={<RotaLogin />} /> */}
      {/* <Route path="cadastro/" element={<RotaCadastro />} /> */}
      {/* <Route path="esqueci-minha-senha/" element={<RotaEsqueciSenha />} /> */}
      {/* <Route path="redefinir-senha/" element={<RotaRedefinirSenha />} /> */}
      <Route index loader={() => redirect("/login-google")} />
      <Route path="login-google" element={<RotaLoginComGoogle />} />
      <Route path="app/" element={<ProtectedApp />}>
        {/* <Route path="perfil/" element={<RotaPerfil />} /> */}
        <Route index loader={() => redirect("/app/categorias")} />
        <Route path="categorias/" element={<RotaCategorias />} />
        <Route path="categorias/:identificadorCategoria/">
          <Route
            index
            loader={(d) => {
              return redirect(
                `/app/categorias/${d.params.identificadorCategoria}/ranking`,
              );
            }}
          />
          <Route path="perguntas/" element={<RotaPergunta />} />
          <Route path="fim-quiz/" element={<RotaFimQuiz />} />
          <Route path="respostas/" element={<RotaRespostas />} />
          <Route path="ranking/" element={<RotaRankingCategoria />} />
        </Route>
      </Route>
    </Route>,
  ),
);
