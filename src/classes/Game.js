import { Player } from "./Player.js";
import { message } from "../utils/index.js";

// Game assets
import { characters, roundTypes, tracks } from "../assets/index.js";

export class Game {
  #track = null;

  constructor(gameSpeedFactor = 1) {
    this.player1 = null;
    this.player2 = null;
    this.winner = null;
    this.loser = null;
    this.gameSpeedFactor = gameSpeedFactor;
    this.gameSpeed = 1000 / gameSpeedFactor;
  }

  async start() {
    await this.log(
      "\n🏁 Bem-vindo(a) ao Simulador de Corridas do Mario Kart! 🏁\n"
    );
    await this.log("🏁 Iniciando o jogo! 🏁\n");

    await this.drawPlayers();
    await this.drawTrack();
    await this.startRace();
  }

  async drawPlayers() {
    await this.log("Sorteando personagens\n");

    await this.log("Sorteando personagem 1... 🎲", 2000 / this.gameSpeedFactor);

    let player1Index = Math.floor(Math.random() * characters.length);
    this.player1 = new Player(...Object.values(characters[player1Index]));
    await this.log(`${this.player1.getPlayerInfo()}\n`);

    await this.log("Sorteando personagem 2... 🎲", 2000 / this.gameSpeedFactor);

    let player2Index;
    do {
      const newCharacterIndex = Math.floor(Math.random() * characters.length);
      if (newCharacterIndex !== player1Index) {
        player2Index = newCharacterIndex;
      }
    } while (!player2Index);

    this.player2 = new Player(...Object.values(characters[player2Index]));
    await this.log(`${this.player2.getPlayerInfo()}\n`);
  }

  async drawTrack() {
    await this.log("Sorteando pista", 2000 / this.gameSpeedFactor);

    const trackIndex = Math.floor(Math.random() * tracks.length);
    this.#track = tracks[trackIndex];
    await this.log(`A corrida acontecerá em ${this.#track.name}`);
    await this.log(`Número de voltas: ${this.#track.laps}\n`);
  }

  async startRace() {
    await this.log(
      "🏁🏁🏁 A corrida vai começar! 🏁🏁🏁\n",
      3000 / this.gameSpeedFactor
    );

    await this.log("🚧 Preparar...");

    await this.log("🚧 Apontar...");

    await this.log(
      "🚗💨 A corrida começou!! 🚗💨\n",
      2000 / this.gameSpeedFactor
    );

    for (let i = 0; i < this.#track.laps; i++) {
      await this.playRound(i + 1);
    }

    await this.log(`\n🚩 Fim do jogo! 🚩\n`);

    await this.endGame();
  }

  async playRound(round) {
    const rountType = this.drawRoundType();
    await this.log(`\nO Round ${round} é de ${rountType.name}\n`);

    const player1AttackValue = await this.player1.play(rountType.attribute);
    const player2AttackValue = await this.player2.play(rountType.attribute);
    const player1TotalAttackValue =
      player1AttackValue.diceValue + player1AttackValue.attributeValue;
    const player2TotalAttackValue =
      player2AttackValue.diceValue + player2AttackValue.attributeValue;

    await this.log(
      `${this.player1.name} tirou ${player1AttackValue.diceValue} 🎲 | +${player1AttackValue.attributeValue} | Total: ${player1TotalAttackValue}`
    );

    await this.log(
      `${this.player2.name} tirou ${player2AttackValue.diceValue} 🎲 | +${player2AttackValue.attributeValue} | Total: ${player2TotalAttackValue}`
    );

    if (player1TotalAttackValue > player2TotalAttackValue) {
      this.player1.increaseScore();
      await this.log(
        `${this.player1.name} ganhou 1 ponto! (${this.player1.getScore()}) ⭐`
      );

      if (rountType.attribute === "power") {
        this.player2.decreaseScore();
        await this.log(
          `${this.player2.name} perdeu 1 ponto! (${this.player2.getScore()}) 🥹`,
          this.gameSpeed
        );
      } else {
        await this.log(
          `${
            this.player2.name
          } manteve sua posição! (${this.player2.getScore()})`
        );
      }
    } else if (player1TotalAttackValue < player2TotalAttackValue) {
      this.player2.increaseScore();
      await this.log(
        `${this.player2.name} ganhou 1 ponto! (${this.player2.getScore()}) ⭐`
      );

      if (rountType.attribute === "power") {
        this.player1.decreaseScore();
        await this.log(
          `${this.player1.name} perdeu 1 ponto! (${this.player1.getScore()}) 🥹`,
          this.gameSpeed
        );
      } else {
        await this.log(
          `${
            this.player1.name
          } manteve sua posição! (${this.player1.getScore()})`
        );
      }
    } else {
      await this.log("💥 Empate! 💥");
    }
  }

  drawRoundType() {
    return roundTypes[Math.floor(Math.random() * roundTypes.length)];
  }

  async endGame() {
    if (this.player1.getScore() > this.player2.getScore()) {
      this.winner = this.player1;
      this.loser = this.player2;
    } else if (this.player1.getScore() < this.player2.getScore()) {
      this.winner = this.player2;
      this.loser = this.player1;
    }

    if (this.winner) {
      await this.log(
        `🥇 1º Lugar: ${this.winner.name} | ${this.winner.getScore()} pontos.`
      );
      await this.log(
        `🥈 2º Lugar: ${this.loser.name} | ${this.loser.getScore()} pontos.`
      );
    } else {
      await this.log(`A corrida foi bem acirrada e terminou em empate! 👏😯`);
    }
  }

  async log(messageStr, delay = this.gameSpeed) {
    await message(messageStr, delay);
  }
}
