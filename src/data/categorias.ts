export type Categoria = {
  titulo: string;
  descricao: string;
  identificador: number;
};

export const categorias: Categoria[] = [
  {
    identificador: 9,
    titulo: "Conhecimentos gerais",
    descricao:
      "Teste seu conhecimento sobre uma ampla gama de assuntos neste desafio de sabedoria universal.",
  },
  {
    identificador: 18,
    titulo: "Computadores",
    descricao:
      "Mostre que você é um mestre da tecnologia e responda perguntas sobre o mundo dos computadores e da informática.",
  },
  {
    identificador: 11,
    titulo: "Filmes",
    descricao:
      "Entre no mundo mágico do cinema e prove o quanto você sabe sobre filmes, diretores e atores famosos.",
  },
  {
    identificador: 15,
    titulo: "Videogames",
    descricao:
      "Explore o universo dos jogos eletrônicos e teste seu conhecimento sobre títulos icônicos e personagens populares.",
  },
];

export function findCategoriaByIdentificador(
  identificador: number,
): Categoria | undefined {
  return categorias.find(
    (categoria) => categoria.identificador === identificador,
  );
}
