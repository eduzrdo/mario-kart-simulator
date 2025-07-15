import { rollDice } from "../utils/index.js";
import { items } from "../assets/items.js";
import { game } from "../../index.js";

export class Player {
  #score;
  #speed;
  #maneuverability;
  #power;
  #intelligence;
  #item;

  constructor(name, speed, maneuverability, power, intelligence) {
    this.name = name;
    this.#score = 0;
    this.#speed = speed;
    this.#maneuverability = maneuverability;
    this.#power = power;
    this.#intelligence = intelligence;
  }

  increaseScore() {
    this.#score += 1;
  }

  decreaseScore() {
    this.#score -= this.#score === 0 ? 0 : 1;
  }

  getScore() {
    return this.#score;
  }

  getSpeed() {
    return this.#speed;
  }

  getManeuverability() {
    return this.#maneuverability;
  }

  getPower() {
    return this.#power;
  }

  getIntelligence() {
    return this.#intelligence;
  }

  getPlayerInfo() {
    return `🚗 ${
      this.name
    } | 🏃 Velocidade: ${this.getSpeed()} | 🛹 Manobrabilidade: ${this.getManeuverability()} | 🥊 Poder: ${this.getPower()} | 🧠 Inteligência: ${this.getIntelligence()}`;
  }

  async play(attribute) {
    const diceValue = rollDice();
    let attributeValue = 0;
    let attributeName = "";

    switch (attribute) {
      case "speed":
        attributeValue += this.#speed;
        attributeName = "Velocidade";
        break;
      case "maneuverability":
        attributeValue += this.#maneuverability;
        attributeName = "Manobrabilidade";
        break;
      case "power":
        attributeValue += this.#power;
        attributeName = "Poder";
        break;
      case "intelligence":
        attributeValue += this.#intelligence;
        attributeName = "Inteligência";
        break;
      default:
        break;
    }

    let totalAttackValue = diceValue + attributeValue;

    await game.gameLog(
      `${this.name} tirou ${diceValue} 🎲 | +${attributeValue} (${attributeName}) | Total: ${totalAttackValue}`
    );

    if (this.#item) {
      totalAttackValue += this.#item.power;

      await game.gameLog(
        `${this.name} usou um item! ${this.#item.name} | +${
          this.#item.power
        } | Total: ${totalAttackValue}`
      );

      this.#item = null;
    }

    return totalAttackValue;
  }

  async drawItem() {
    const successRateMultiplier = 2;
    const playerSuccessrate =
      (this.#maneuverability * successRateMultiplier) / 10;

    const randomNumber = Math.random();

    if (randomNumber < playerSuccessrate) {
      const item = items[Math.floor(Math.random() * items.length)];
      this.#item = item;
      await game.gameLog(`${this.name} obteve um item! ${item.name}`);
      return;
    }
  }
}
