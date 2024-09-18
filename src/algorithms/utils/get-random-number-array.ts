export const getRandomNumberArray = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 1000000));
