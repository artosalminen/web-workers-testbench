import React from "react";
import Button from "../../atoms/button";
import { useWorker } from "./use-worker.hook";

export const ComlinkDemo = ({ defaultValue = 5 }) => {
  const [nextArraySize, setNextArraySize] =
    React.useState<number>(defaultValue);
  const [currentArraySize, setCurrentArraySize] = React.useState<number | null>(
    null,
  );
  const workerResult = useWorker(currentArraySize ?? 0);

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">Comlink</h4>
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
        <Button
          onClick={() => {
            if (nextArraySize) {
              setCurrentArraySize(nextArraySize);
            }
          }}
          title={
            currentArraySize === nextArraySize
              ? "Due to memoization, the worker will not run again until you change the value"
              : "Sort"
          }
          disabled={currentArraySize === nextArraySize}
        >
          {workerResult.isCalculating ? "Sorting..." : "Sort"}
        </Button>
        {currentArraySize && workerResult && (
          <p className="text-1xl text-blue-200">
            Worker is{" "}
            {currentArraySize !== workerResult.sorted?.length ? "now" : "done"}{" "}
            sorting {workerResult.sorted?.length ?? currentArraySize} numbers:{" "}
            {workerResult.sorted && workerResult.sorted?.length > 0
              ? `${workerResult.sorted?.slice(0, 5).join(", ")}...${workerResult.sorted
                  ?.slice(-5)
                  .join(", ")}`
              : ""}
          </p>
        )}
        {!!workerResult?.timeElapsed && (
          <p className="text-1xl text-blue-200">
            Time elapsed: {workerResult.timeElapsed}ms
          </p>
        )}
      </div>
    </div>
  );
};

export default ComlinkDemo;
