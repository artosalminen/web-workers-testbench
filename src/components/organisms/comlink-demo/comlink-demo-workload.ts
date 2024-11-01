import * as Comlink from "comlink";

import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

export interface WorkerApi {
  calculate: (numbersToSort: number) => {
    sorted: number[];
    timeElapsed: number;
  };
}

const calculate = (numbersToSort: number) => {
  const numbers = getRandomNumberArray(numbersToSort);
  const { sorted, timeElapsed } = bubbleSort(numbers);
  return {
    sorted,
    timeElapsed,
  };
};

export const worker = Comlink.expose({
  calculate,
});
