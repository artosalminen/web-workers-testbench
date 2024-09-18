import { expose } from "use-worker-promise/register";
import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

export const example = (numbersToSort: number) => {
  const numbers = getRandomNumberArray(numbersToSort);
  return bubbleSort(numbers);
};

export const worker = expose(example);
