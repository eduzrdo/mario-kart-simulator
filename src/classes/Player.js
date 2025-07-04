import { roll, message } from "../utils/index.js";

export class Player {
  #score;
  #speed;
  #maneuverability;
  #power;
  #intelligence;

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

  async play(status) {
    const diceValue = roll();

    switch (status) {
      case "speed":
        return { diceValue, attributeValue: this.#speed };
      case "maneuverability":
        return { diceValue, attributeValue: this.#maneuverability };
      case "power":
        return { diceValue, attributeValue: this.#power };
      case "intelligence":
        return { diceValue, attributeValue: this.#intelligence };
      default:
        break;
    }
  }
}
