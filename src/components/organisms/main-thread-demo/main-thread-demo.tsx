import React from "react";
import Button from "../../atoms/button";
import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

export const MainThreadDemo = ({ defaultValue = 5 }) => {
  const [nextArraySize, setNextArraySize] = React.useState<number>(defaultValue);
  const [currentArraySize, setCurrentArraySize] = React.useState<number | null>(null);
  const [sortedResult, setSortedResult] = React.useState<number[]>([]);

  const sort = (arraySize: number) => {
    if (arraySize) {
      setSortedResult([]);
      setSortedResult(bubbleSort(getRandomNumberArray(arraySize)));
    }
  };

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">
          Main thread demo
        </h4>
        <label
          htmlFor="main-thread-demo-input"
          className="text-1xl text-blue-200"
        >
          Change size of array and click 'Sort':
        </label>
        <input
          id="main-thread-demo-input"
          className="form-input rounded-xl text-blue-800 mb-2"
          type="number"
          value={nextArraySize}
          onChange={(e) => setNextArraySize(parseInt(e.target.value))}
        />
        <Button
          onClick={() => { setCurrentArraySize(nextArraySize); sort(nextArraySize); }}
          title="Sort"
        >
          {(currentArraySize &&
            currentArraySize !== sortedResult?.length &&
            `Sorting random ${currentArraySize} numbers...`) ||
            "Sort"}
        </Button>
        {sortedResult && (
          <p className="text-1xl text-blue-200">
            Done sorting {sortedResult.length} numbers:{" "}
            {sortedResult.length > 0 ? `${sortedResult.slice(0, 5).join(", ")}...` : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default MainThreadDemo;
