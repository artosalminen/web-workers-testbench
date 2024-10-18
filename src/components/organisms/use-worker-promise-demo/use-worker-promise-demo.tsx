import { createWorkerFactory, useWorkerMemo } from "use-worker-promise";
import React from "react";
import Button from "../../atoms/button";

const workerLoader = createWorkerFactory<
  typeof import("./use-worker-promise-example")["worker"]
>(
  () =>
    new Worker(new URL("./use-worker-promise-example.ts", import.meta.url), {
      type: "module",
      name: "useWorkerPromiseExample",
    })
);

export const UseWorkerPromiseDemo = ({ defaultValue = 5 }) => {
  const [nextArraySize, setNextArraySize] =
    React.useState<number>(defaultValue);
  const [currentArraySize, setCurrentArraySize] = React.useState<number | null>(
    null
  );

  const workerResult = useWorkerMemo(workerLoader, currentArraySize ?? 0);

  return (
    <div className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <h4 className="text-2xl font-bold text-blue-200 pb-2">
          use-worker-promise demo
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
        <Button
          onClick={() => {
            if (nextArraySize) {
              setCurrentArraySize(nextArraySize)
              performance.mark("worker-promise-sort-start");
            }
          }}
          title={
            currentArraySize === nextArraySize
              ? "Due to memoization, the worker will not run again until you change the value"
              : "Sort"
          }
          disabled={currentArraySize === nextArraySize}
        >
          {(!!currentArraySize &&
            currentArraySize !== workerResult?.result.length &&
            `Worker is sorting random ${currentArraySize} numbers...`) ||
            "Sort"}
        </Button>
        {currentArraySize && workerResult && (
          <p className="text-1xl text-blue-200">
            Worker is{" "}
            {currentArraySize !== workerResult.result.length ? "now" : "done"} sorting{" "}
            {workerResult.result.length || currentArraySize} numbers:{" "}
            {workerResult.result.length > 0
              ? `${workerResult.result.slice(0, 5).join(", ")}...${workerResult.result
                .slice(-5)
                .join(", ")}`
              : ""}
          </p>
        )}
        {
          !!workerResult?.timeElapsed && <p className="text-1xl text-blue-200">Time elapsed: {workerResult.timeElapsed}ms</p>
        }
      </div>
    </div>
  );
};

export default UseWorkerPromiseDemo;
