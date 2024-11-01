import { expose } from "use-worker-promise/register";
import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

export const example = (numbersToSort: number) => {
  const numbers = getRandomNumberArray(numbersToSort);
  const { sorted, timeElapsed } = bubbleSort(numbers);
  return {
    sorted,
    timeElapsed,
  };
};

export const worker = expose(example);
