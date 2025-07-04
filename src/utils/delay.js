export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomDelay() {
  return delay(Math.floor(Math.random() * 1500) + 1500);
}
