import { createWorkerFactory, useWorkerMemo } from "use-worker-promise";
import React, { useState, useEffect } from "react";
import Button from "../../atoms/button";

interface UseWorkerPromiseDemoProps {
  defaultValue?: number;
}

const workerLoader = createWorkerFactory<typeof import("./use-worker-promise-example")["worker"]>(
  () =>
    new Worker(new URL("./use-worker-promise-example.ts", import.meta.url), {
      type: "module",
      name: "useWorkerPromiseExample",
    })
);

export const UseWorkerPromiseDemo: React.FC<UseWorkerPromiseDemoProps> = ({ defaultValue = 5 }) => {
  const [nextValue, setNextValue] = useState<number | null>(defaultValue);
  const [value, setValue] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const workerResult = useWorkerMemo(workerLoader, value ?? 0);

  useEffect(() => {
    let startTime: number | null = null;
    let interval: NodeJS.Timeout | null = null;

    if (isSorting) {
      startTime = performance.now();
      interval = setInterval(() => {
        const currentTime = performance.now();
        setTimer(parseFloat(((currentTime - startTime!) / 1000).toFixed(2)));
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSorting]);

  useEffect(() => {
    if (value !== null) {
      setIsSorting(true);
    }
  }, [value]);

  useEffect(() => {
    if (workerResult && isSorting) {
      setIsSorting(false);
    }
  }, [workerResult]);

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
