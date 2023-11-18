import { FC, FormEvent, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { findCategoriaByIdentificador } from "../data/categorias";
import { useQuery } from "react-query";
import { getPerguntasPorCategoria } from "../api";
import shuffle from "lodash/shuffle";
import { LoadingSpinner } from "../components/LoadingSpinner";
import clsx from "clsx";
import { aumentarPontuacaoDoUsuarioPorCategoria } from "../firebase/dataStore";
import { useUserStore } from "../stores/userStore";

const indiceParaLetra: Record<number, string> = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
};

type PropsPergunta = {
  numero: number;
  questao: string;
  opcoes: string[];
  desabilitado: boolean;
  opcaoCorreta: string;
};

const CardPergunta: FC<PropsPergunta> = (props) => {
  return (
    <div className="card h-100 brainz-blue-text">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {props.numero}. {atob(props.questao)}
        </h5>

        <div className="card-text">
          {props.opcoes.map((opcao, indice) => {
            return (
              <div key={indice} className="form-check">
                <input
                  required
                  disabled={props.desabilitado}
                  className="form-check-input"
                  type="radio"
                  name={"respostaPergunta" + props.numero}
                  id={"respostaPergunta" + props.numero + "" + indice}
                  data-resposta={atob(opcao)}
                />
                <label
                  className={clsx(
                    "form-check-label",
                    props.desabilitado &&
                      props.opcaoCorreta === opcao &&
                      "text-success",
                  )}
                  htmlFor={"respostaPergunta" + props.numero + "" + indice}
                >
                  <p>
                    <span className="fw-bold">{indiceParaLetra[indice]}. </span>
                    {atob(opcao)}
                  </p>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function getRespostaSelecionada(list: RadioNodeList) {
  for (let indice = 0; indice < list.length; indice++) {
    const radio = list[indice] as HTMLInputElement;

    if (radio.checked) return radio.getAttribute("data-resposta") as string;
  }

  return "";
}

const Botoes: FC<{
  enviou: boolean;
  identificadorCategoria: number;
  onReinicarQuiz: () => void;
}> = (props) => {
  if (props.enviou) {
    return (
      <>
        <button
          className="btn btn-outline-primary"
          onClick={props.onReinicarQuiz}
        >
          Reiniciar quiz
        </button>
        <Link
          className="btn btn-primary"
          to={"/app/categorias/" + props.identificadorCategoria + "/ranking"}
        >
          Ver ranking
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/app" className="btn btn-outline-danger">
        Sair do quiz
      </Link>
      <button className="btn btn-primary" type="submit">
        Enviar
      </button>
    </>
  );
};

export const RotaPergunta: FC = () => {
  const userStore = useUserStore();
  const { identificadorCategoria } = useParams();
  const { isLoading, data, refetch } = useQuery("perguntas", () =>
    getPerguntasPorCategoria(parseInt(identificadorCategoria || "0", 10)),
  );
  const [enviou, setEnviou] = useState(false);
  const [numAcertos, setNumAcertos] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  if (identificadorCategoria === undefined) {
    return <Navigate to="/app/categorias" />;
  }

  const categoria = findCategoriaByIdentificador(
    parseInt(identificadorCategoria, 10),
  );

  if (categoria === undefined) return <Navigate to="/app" />;

  if (isLoading) return <LoadingSpinner />;

  if (data === undefined) return <p>Erro ao carregar perguntas.</p>;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    //prevenir o comportamento padrao de submissao de formulario do navegador
    event.preventDefault();
    //desabilita os cards das perguntas
    setEnviou(true);

    const respostas: string[] = [];
    for (let index = 1; index < 11; index++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const element: RadioNodeList = event.target["respostaPergunta" + index];

      respostas.push(getRespostaSelecionada(element));
    }

    if (data === undefined) return;
    //verifica as respostas corretas marcadas pelo usuario
    const respostasCorretas = respostas.filter((resposta, indice) => {
      return resposta === atob(data[indice].correct_answer);
    });

    if (userStore.user === null) return;
    //vai pegar o numero de respostas corretas e dps vai mostrar pro usuario
    setNumAcertos(respostasCorretas.length);
    // salvar no firebase
    await aumentarPontuacaoDoUsuarioPorCategoria({
      identificadorCategoria: parseInt(identificadorCategoria || "0", 10),
      userId: userStore.user.uid,
      pontucacao: respostasCorretas.length,
      nomeDoUsuario: userStore.user.displayName,
    });
  }

  return (
    <>
      <Helmet>
        <title>Brainz - Perguntas</title>
      </Helmet>
      <main className="d-flex flex-column justify-content-center align-items-center mt-4">
        <div className="mb-4 d-flex align-items-center flex-column flex-md-row">
          <img
            src="/brainz/brainz-question-mark.svg"
            width={180}
            height={180}
            alt="Placeholder"
          />

          <div className="ms-4">
            <h1>{categoria.titulo}</h1>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {data.map((pergunta, indice) => {
              const opcoes = shuffle([
                ...pergunta.incorrect_answers,
                pergunta.correct_answer,
              ]);

              return (
                <div key={indice} className="col">
                  <CardPergunta
                    numero={indice + 1}
                    questao={pergunta.question}
                    opcoes={opcoes}
                    desabilitado={enviou}
                    opcaoCorreta={pergunta.correct_answer}
                  />
                </div>
              );
            })}
          </div>

          {enviou && <p>Você acertou {numAcertos} de 10.</p>}

          <div className="d-flex justify-content-between gap-2 mt-4">
            <Botoes
              onReinicarQuiz={() => {
                //busca novas perguntas           
                refetch();
                //vai resetar a variavel p/ false p/ habilitar os cards de pergunta novamente
                setEnviou(false);
                //o numero de acertos vai reiniciar com 0
                setNumAcertos(0);
                //retira as marcacoes anteriores dos usuarios 
                formRef.current?.reset();
              }}
              enviou={enviou}
              identificadorCategoria={parseInt(identificadorCategoria, 10)}
            />
          </div>
        </form>
      </main>
    </>
  );
};
