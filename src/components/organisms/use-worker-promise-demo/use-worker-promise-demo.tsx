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
  const [nextValue, setNextValue] = React.useState<number | null>(null);
  const [value, setValue] = React.useState<number | null>(null);

  const workerResult = useWorkerMemo(workerLoader, value ?? 0);

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
          Change value and click 'Sort':
        </label>
        <input
          id="use-worker-promise-demo-input"
          className="mb-2"
          type="number"
          value={nextValue ?? defaultValue}
          onChange={(e) => setNextValue(parseInt(e.target.value))}
        />
        <Button
          onClick={() => nextValue && setValue(nextValue)}
          title="Sort"
          disabled={!!value && value !== workerResult?.length}
        >
          {(!!value &&
            value !== workerResult?.length &&
            `Worker is sorting random ${value} numbers...`) ||
            "Sort"}
        </Button>
        {value && workerResult && (
          <p className="text-1xl text-blue-200">
            Worker is done sorting {workerResult.length} numbers:{" "}
            {workerResult.length > 0
              ? `${workerResult.slice(0, 5).join(", ")}...`
              : "none"}
          </p>
        )}
      </div>
    </div>
  );
};

export default UseWorkerPromiseDemo;
