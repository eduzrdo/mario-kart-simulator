# Simulador de corridas do Mario Kart com Node.js

<!-- imagem do projeto -->

<img src="https://github.com/eduzrdo/assets/blob/a1da3945fc88bf74d0068b7504c6f0fa0948c657/DIO/mario-kart/mario-kart-8-e-o-jogo-mais-vendido-do-nintendo-switch.jpg?raw=true" alt="Projeto de simulador de corridas do Mario Kart com Node.js">

## Introdução 👋

Este projeto é um simulador de corridas do Mario Kart com Node.js. Ele foi desenvolvido para o Bootcamp DIO Meutudo Mobile Developer.

## Objetivo 🎯

O objetivo do projeto é fornecer uma experiência de jogo simulando uma corrida do Mario Kart, permitindo que eles aprendam sobre Node.js e JavaScript.

## Tecnologias utilizadas 👨‍💻

- Node.js
- JavaScript

## Diferenciais do projeto original ✨

- Foi incluído um sistema de itens, onde os jogadores tem uma chance de obter um item a cada volta na pista, e durante a disputa da volta em questão, usam esses itens para aumentar seu poder de combate.
- O projeto também foi codificado de uma forma que o jogador possa alterar o jogo, e até adicionar novos personagens e itens.

## Como executar o projeto 🏃

Para executar o projeto, siga os seguintes passos:

1. Clone o repositório:

```
git clone https://github.com/eduzrdo/mario-kart-simulator.git
```

2. Entre na pasta do projeto:

```
cd mario-kart-simulator
```

3. Instale as dependências:

```
npm install
```

4. Execute o projeto:

```
npm start
```

## Como deixar o jogo com a sua cara 💡🛠️

Você pode alterar as configurações do jogo e o seu conteúdo de uma forma bem simples, basta alterar os seguintes arquivos, seguindo seus formatos:

### Alterar a velocidade do jogo:

- `index.js`: nesse arquivo na raiz do proejto, altere a 3ª linha, onde o jogo é instanciado antes de ser iniciado, você pode passar a velocidade do jogo como parâmetro.

`export const game = new Game(<INSIRA AQUI A VELOCIDADE DO JOGO>);`

Ex.: `export const game = new Game(10);`

Salve o jogo e rode-o novamente com o comando `npm start`.

Se nenhum parâmetro for passado, o jogo será iniciado com a velocidade padrão (1).

### Para adicionar novos conteúdos:

- `src/assets/characters.js`: aqui você pode alterar as características dos personagens, e até adicionar novos personagens.
- `src/assets/items.js`: aqui você pode adicionar novos itens, e até alterar os itens existentes.
- `src/assets/tracks.js`: aqui você pode alterar as pistas, e até adicionar novas pistas.
