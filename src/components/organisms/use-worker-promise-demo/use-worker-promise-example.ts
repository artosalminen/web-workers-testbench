import { expose } from 'use-worker-promise/register'
import bubbleSort from '../../../algorithms/bubble-sort/bubble-sort'
import { getRandomNumberArray } from '../../../algorithms/utils/get-random-number-array'

export const example = (numbersToSort: number) => {
  const numbers = getRandomNumberArray(numbersToSort)
  performance.mark('worker-promise-sort-start')
  const result = bubbleSort(numbers)
  performance.mark('worker-promise-sort-end')
  const timeElapsed = Math.floor(
    performance.measure('worker-promise-sort', 'worker-promise-sort-start', 'worker-promise-sort-end').duration
  )
  return {
    result,
    timeElapsed,
  }
}

export const worker = expose(example)
