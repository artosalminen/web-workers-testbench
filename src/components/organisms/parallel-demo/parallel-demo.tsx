import React from "react";
import Button from "../../atoms/button";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";
import bubbleSort from "../../../algorithms/bubble-sort";

// Function to merge two sorted arrays
const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concat the remaining elements from both arrays
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

// Main parallel bubble sort function with chunking
const parallelBubbleSort = async (
  arr: number[],
  chunkSize: number,
): Promise<{ sorted: number[]; timeElapsed: number | null }> => {
  const n = arr.length;
  const chunks: number[][] = [];

  // Split array into chunks
  for (let i = 0; i < n; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }

  // Sort chunks in parallel
  const sortResults = await Promise.all(
    chunks.map((chunk) => {
      return Promise.resolve(bubbleSort(chunk));
    }),
  );

  // Merge sorted chunks together
  if (sortResults.length === 0) {
    return {
      sorted: [],
      timeElapsed: null,
    };
  }
  let totalElapsedTime = sortResults[0].timeElapsed;
  let sortedArray = sortResults[0].sorted;
  for (let i = 1; i < sortResults.length; i++) {
    sortedArray = merge(sortedArray, sortResults[i].sorted);
    totalElapsedTime += sortResults[i].timeElapsed;
  }

  return {
    sorted: sortedArray,
    timeElapsed: totalElapsedTime,
  };
};

export const ParallelDemo = ({ defaultValue = 5, chunkSize = 100 }) => {
  const [nextArraySize, setNextArraySize] =
    React.useState<number>(defaultValue);
  const [nextChunkSize, setNextChunkSize] = React.useState<number>(chunkSize);
  const [currentArraySize, setCurrentArraySize] = React.useState<number | null>(
    null,
  );
  const [currentChunkSize, setCurrentChunkSize] = React.useState<number | null>(
    null,
  );
  const [workerResult, setWorkerResult] = React.useState<number[]>([]);
  const [timeElapsed, setTimeElapsed] = React.useState<number | null>(null);

  React.useEffect(() => {
    const numbersToSort = getRandomNumberArray(currentArraySize ?? 0);
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const res = await parallelBubbleSort(
        numbersToSort,
        currentChunkSize ?? 2,
      );
      if (!active) {
        return;
      }
      setWorkerResult(res.sorted);
      setTimeElapsed(res.timeElapsed);
    }
  }, [currentArraySize, currentChunkSize]);

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">
          Parallel bubble sort in main thread demo
        </h4>
        <label
          htmlFor="use-worker-promise-demo-input"
          className="text-1xl text-blue-200"
        >
          Change size of array and click 'Sort':
        </label>
        <input
          id="use-worker-promise-demo-input"
          className="form-input rounded-xl text-blue-800 mb-2"
          type="number"
          value={nextArraySize}
          onChange={(e) => setNextArraySize(parseInt(e.target.value))}
        />
        <label
          htmlFor="use-worker-promise-demo-chunk-size-input"
          className="text-1xl text-blue-200"
        >
          Change size of parallel chunks:
        </label>
        <input
          id="use-worker-promise-demo-chunk-size-input"
          className="form-input rounded-xl text-blue-800 mb-2"
          type="number"
          value={nextChunkSize}
          onChange={(e) => setNextChunkSize(parseInt(e.target.value))}
        />
        <Button
          onClick={() => {
            if (nextArraySize && nextChunkSize) {
              setCurrentArraySize(nextArraySize);
              setCurrentChunkSize(nextChunkSize);
            }
          }}
          title={
            currentArraySize === nextArraySize &&
            currentChunkSize === nextChunkSize
              ? "Due to memoization, the worker will not run again until you change the value"
              : "Sort"
          }
          disabled={
            currentArraySize === nextArraySize &&
            currentChunkSize === nextChunkSize
          }
        >
          {(!!currentArraySize &&
            currentArraySize !== workerResult?.length &&
            `Worker is sorting random ${currentArraySize} numbers...`) ||
            "Sort"}
        </Button>
        {currentArraySize && workerResult && (
          <p className="text-1xl text-blue-200">
            Main thread is{" "}
            {currentArraySize !== workerResult.length ? "now" : "done"} sorting{" "}
            {workerResult.length || currentArraySize} numbers:{" "}
            {workerResult.length > 0
              ? `${workerResult.slice(0, 5).join(", ")}...${workerResult
                  .slice(-5)
                  .join(", ")}`
              : ""}
          </p>
        )}
        {timeElapsed && (
          <p className="text-1xl text-blue-200">
            Time elapsed: {timeElapsed}ms
          </p>
        )}
      </div>
    </div>
  );
};

export default ParallelDemo;
