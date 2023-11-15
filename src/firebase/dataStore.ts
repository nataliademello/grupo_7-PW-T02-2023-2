import {
  setDoc,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "./db";

type AumentarPontuacaoDoUsuarioPorCategoriaInput = {
  identificadorCategoria: number;
  userId: string;
  pontucacao: number;
  nomeDoUsuario: string | null;
};

export async function aumentarPontuacaoDoUsuarioPorCategoria(
  input: AumentarPontuacaoDoUsuarioPorCategoriaInput,
) {
  const docRef = doc(
    db,
    "rankingCategoria",
    String(input.identificadorCategoria),
    "usuarios",
    input.userId,
  );

  const docSnap = await getDoc(docRef);

  const acumulado = docSnap.exists() ? docSnap.data().pontuacao : 0;

  await setDoc(
    doc(
      db,
      "rankingCategoria",
      String(input.identificadorCategoria),
      "usuarios",
      input.userId,
    ),
    {
      pontuacao: input.pontucacao + acumulado,
      nome: input.nomeDoUsuario,
    },
  );
}

export async function getRankingPorCategoria(identificadorCategoria: number) {
  const colRef = collection(
    db,
    "rankingCategoria",
    String(identificadorCategoria),
    "usuarios",
  );

  const q = query(colRef, orderBy("pontuacao", "desc"), limit(3));

  const qSnap = await getDocs(q);

  return qSnap.docs.map((d) => {
    const data = d.data();

    return {
      id: d.id,
      nome: data.nome as string,
      pontuacao: data.pontuacao as number,
    };
  });
}

export async function getPontuacaoPorUsuarioPorCategoria(
  userId: string,
  identificadorCategoria: number,
) {
  const docRef = doc(
    db,
    "rankingCategoria",
    String(identificadorCategoria),
    "usuarios",
    userId,
  );

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return undefined;

  return docSnap.data().pontuacao as number;
}
