import React, { useState } from "react";
import Button from "../../atoms/button";
import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

interface MainThreadDemoProps {
  defaultValue?: number;
}

export const MainThreadDemo: React.FC<MainThreadDemoProps> = ({ defaultValue = 5 }) => {
  const [nextValue, setNextValue] = useState<number | null>(defaultValue);
  const [value, setValue] = useState<number | null>(null);
  const [result, setResult] = useState<number[]>([]);
  const [timer, setTimer] = useState(0);
  const [isSorting, setIsSorting] = useState(false);

  const handleSort = () => {
    setIsSorting(true);
    const startTime = performance.now();

    // Perform the sorting synchronously, blocking the main thread
    const sortedResult = bubbleSort(getRandomNumberArray(nextValue!));

    const endTime = performance.now();
    const elapsedTime = parseFloat(((endTime - startTime) / 1000).toFixed(2));
    setTimer(elapsedTime);

    setResult(sortedResult);
    setValue(nextValue!);
    setIsSorting(false);
  };

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">Main thread demo</h4>
        <label htmlFor="main-thread-demo-input" className="text-1xl text-blue-200">
          Change value and click 'Sort':
        </label>
        <input
          id="main-thread-demo-input"
          className="mb-2"
          type="number"
          value={nextValue ?? defaultValue}
          onChange={(e) => setNextValue(parseInt(e.target.value))}
        />
        <Button onClick={handleSort} title="Sort" disabled={isSorting}>
          {isSorting ? `Sorting random ${nextValue} numbers...` : "Sort"}
        </Button>
        {value && result && (
          <p className="text-1xl text-blue-200">
            Done sorting {result.length} numbers: {result.slice(0, 5).join(", ")}...
          </p>
        )}
        <h2 className="text-lg font-bold">Time elapsed: {timer} seconds</h2>
      </div>
    </div>
  );
};

export default MainThreadDemo;