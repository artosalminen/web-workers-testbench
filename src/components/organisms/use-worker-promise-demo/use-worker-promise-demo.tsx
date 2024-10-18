import { createWorkerFactory, useWorkerMemo } from "use-worker-promise";
import React, { useState, useEffect } from "react";
import Button from "../../atoms/button";

// Defines the props that can be passed to this component
interface UseWorkerPromiseDemoProps {
  defaultValue?: number; // An optional prop to set the default value
}

// Creates a factory for loading a web worker dynamically
const workerLoader = createWorkerFactory<typeof import("./use-worker-promise-example")["worker"]>(
  () =>
    new Worker(new URL("./use-worker-promise-example.ts", import.meta.url), {
      type: "module", // Loads the worker as an ES module
      name: "useWorkerPromiseExample", // Name for the worker thread
    })
);

export const UseWorkerPromiseDemo: React.FC<UseWorkerPromiseDemoProps> = ({ defaultValue = 5 }) => {
  // Manages the size of the array to sort
  const [nextValue, setNextValue] = useState<number | null>(defaultValue);
  const [value, setValue] = useState<number | null>(null);
  const [timer, setTimer] = useState(0); // Tracks the time taken to sort
  const [isSorting, setIsSorting] = useState(false); // Indicates if the worker is currently sorting

  // Uses the worker to calculate the result when the value changes
  const workerResult = useWorkerMemo(workerLoader, value ?? 0);

  // Timer logic: Tracks the elapsed time while sorting
  useEffect(() => {
    let startTime: number | null = null;
    let interval: NodeJS.Timeout | null = null;

    if (isSorting) {
      startTime = performance.now(); // Records start time
      interval = setInterval(() => {
        const currentTime = performance.now();
        setTimer(parseFloat(((currentTime - startTime!) / 1000).toFixed(2))); // Updates the timer every 10ms
      }, 10);
    } else if (interval) {
      clearInterval(interval); // Clears the timer when sorting is done
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup function to avoid memory leaks
    };
  }, [isSorting]);

  // Start the sorting process when the value changes
  useEffect(() => {
    if (value !== null) {
      setIsSorting(true);
    }
  }, [value]);

  // Stops sorting when the worker returns the result
  useEffect(() => {
    if (workerResult && isSorting) {
      setIsSorting(false);
    }
  }, [workerResult]);


  // Handles the click to start sorting
  const handleSort = () => {
    setValue(nextValue!);
  };

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">use-worker-promise demo</h4>
        <label htmlFor="use-worker-promise-demo-input" className="text-1xl text-blue-200">
          Change value and click 'Sort':
        </label>
        <input
          id="use-worker-promise-demo-input"
          className="mb-2"
          type="number"
          value={nextValue ?? defaultValue}
          onChange={(e) => setNextValue(parseInt(e.target.value))}
        />
        <Button onClick={handleSort} title="Sort" disabled={isSorting}>
          {isSorting ? `Worker is sorting random ${value} numbers...` : "Sort"}
        </Button>
        {value && workerResult && (
          <p className="text-1xl text-blue-200">
            Worker is done sorting {workerResult.length} numbers: {workerResult.slice(0, 5).join(", ")}...
          </p>
        )}
        <h2 className="text-lg font-bold">Time elapsed: {timer} seconds</h2>
      </div>
    </div>
  );
};

export default UseWorkerPromiseDemo;
