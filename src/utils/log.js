import { delay } from "./delay.js";

export async function log(message, delayMs = 1000) {
  console.log(message);
  await delay(delayMs);
}
