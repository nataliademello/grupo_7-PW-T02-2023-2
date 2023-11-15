export type RespostaJSON = {
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}[];

export async function getPerguntasPorCategoria(identificadorCategoria: number) {
  const url = `https://opentdb.com/api.php?amount=10&category=${identificadorCategoria}&type=multiple&encode=base64`;

  const res = await fetch(url);
  const json = await res.json();

  return json.results as RespostaJSON;
}
