import React from "react";
import { WorkerApi } from "./comlink-demo-workload";
import * as Comlink from "comlink";

export function useWorker(arrayLength: number): {
  isCalculating: boolean;
  timeElapsed: number;
  sorted: number[] | undefined;
} {
  // We'll want to expose a wrapping object so we know when a calculation is in progress
  const [workerResult, setWorkerResult] = React.useState({
    isCalculating: false,
    timeElapsed: 0,
    sorted: undefined as number[] | undefined,
  });

  // acquire our worker
  const { workerApi } = React.useMemo(() => makeWorkerApiAndCleanup(), []);

  React.useEffect(() => {
    // We're starting the calculation here
    setWorkerResult({ isCalculating: true, timeElapsed: 0, sorted: undefined });

    workerApi
      .calculate(arrayLength)
      .then((result) =>
        setWorkerResult({
          isCalculating: false,
          sorted: result.sorted,
          timeElapsed: result.timeElapsed,
        }),
      ); // We receive the result here
  }, [workerApi, setWorkerResult, arrayLength]);

  return workerResult;
}

function makeWorkerApiAndCleanup() {
  // Here we create our worker and wrap it with comlink so we can interact with it
  const workerInstance = new Worker(
    new URL("./comlink-demo-workload.ts", import.meta.url),
    { type: "module" },
  );
  const workerApi = Comlink.wrap<WorkerApi>(workerInstance);

  // A cleanup function that releases the comlink proxy and terminates the worker
  const cleanup = () => {
    workerApi[Comlink.releaseProxy]();
    workerInstance.terminate();
  };

  const workerApiAndCleanup = { workerApi, cleanup };

  return workerApiAndCleanup;
}
