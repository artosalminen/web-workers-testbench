import React, { useState, useEffect } from "react";
import Button from "../../atoms/button";
import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

interface MainThreadDemoProps {
  defaultValue?: number;
}

export const MainThreadDemo = ({ defaultValue = 5 }) => {
  const [nextArraySize, setNextArraySize] =
    React.useState<number>(defaultValue);
  const [currentArraySize, setCurrentArraySize] = React.useState<number | null>(
    null
  );
  const [sortedResult, setSortedResult] = React.useState<number[]>([]);

  // To track the timer and sorting status
  const [timer, setTimer] = useState(0);  // Added timer state
  const [isSorting, setIsSorting] = useState(false);  // Added isSorting state

  // useEffect to clear the timer when sorting is done
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSorting) {
      const startTime = performance.now();
      interval = setInterval(() => {
        const currentTime = performance.now();
        setTimer(parseFloat(((currentTime - startTime) / 1000).toFixed(2)));  // Update timer every 100ms
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);  // Clear interval on component unmount
    };
  }, [isSorting]);

  // Function to handle the sorting process
  const sort = (arraySize: number) => {
    if (arraySize) {
      setIsSorting(true);  // Start sorting
      setSortedResult([]);

      // Simulate sorting process and measure time
      const startTime = performance.now();  // Start timing
      const sorted = bubbleSort(getRandomNumberArray(arraySize));  // Perform the sort
      const endTime = performance.now();  // End timing

      // Stop the timer and store result
      const elapsedTime = parseFloat(((endTime - startTime) / 1000).toFixed(2));
      setTimer(elapsedTime);  // Set final time in seconds
      setSortedResult(sorted);  // Set sorted results
      setIsSorting(false);  // End sorting
    }
  };

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">Main thread demo</h4>
        <label htmlFor="main-thread-demo-input" className="text-1xl text-blue-200">
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
          onClick={() => {
            setCurrentArraySize(nextArraySize);
            sort(nextArraySize); // Trigger sorting and timer
          }}
          title="Sort"
          disabled={isSorting} // Disable button while sorting
        >
          {(currentArraySize && currentArraySize !== sortedResult?.length && `Sorting random ${currentArraySize} numbers...`) || "Sort"}
        </Button>
        {sortedResult && (
          <p className="text-1xl text-blue-200">
            Done sorting {sortedResult.length} numbers:{" "}
            {sortedResult.length > 0 ? `${sortedResult.slice(0, 5).join(", ")}...` : ""}
          </p>
        )}

        {/* Timer display */}
        <h2 className="text-lg font-bold">Time elapsed: {timer} seconds</h2> {/* <-- Display elapsed time */}
      </div>
    </div>
  );
};

export default MainThreadDemo;