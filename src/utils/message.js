import { delay } from "./delay.js";

export async function message(message, delayMs = 1000) {
  console.log(message);
  await delay(delayMs);
}
