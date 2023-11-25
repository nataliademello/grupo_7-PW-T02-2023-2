# readme

Projeto inicializado com `vite`, utilizando o comando:

```
npm create vite@latest
```

E selecionando a opção `react` com `typescript`.

## Instalação do projeto

Para instalar as dependências do projeto, basta executar o seguinte comando na raíz do projeto (no mesmo diretório do arquivo `package.json`):

```
npm install
```

## Execução do projeto em modo de desenvolvimento

Execute o seguinte comando na raíz do projeto:

```
npm run dev
```

O endereço para acessar o projeto será exibido no terminal. Basta clicar no link segurando a tecla `ctrl` para abrí-lo no seu navegador padrão.

### FAQ

#### Por que `vite`?

Segundo os benchmarks, essa ferramenta é muito mais rápida do que o `create-react-app`.

#### Por que `typescript`?

Ajuda a garantir a qualidade do código e a reduzir erros. Além disso, auxilia na captura de erros, tanto quanto aos tipos de dados, quanto as estruturas dos dados, já em tempo de desenvolvimento, ao invés de tempo de execução.

#### Como adicionar uma nova categoria

Para adicionar uma nova categoria, basta adicionar uma nova entrada na constante `categorias` do arquivo `src/data/categorias.ts`. Segue exemplo abaixo:

```ts
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
  // adicionando nova categoria
  {
    // para descobrir o identificador basta consultar o site https://opentdb.com/api_config.php
    // e verificar o parametro `category` na URL gerada com a categoria desejada.
    identificador: 99999,
    // nome da categoria que será mostrada no card
    titulo: "Videogames",
    // descricao da categoria que será mostrada no card
    descricao:
      "Explore o universo dos jogos eletrônicos e teste seu conhecimento sobre títulos icônicos e personagens populares.",
  },
];
```
