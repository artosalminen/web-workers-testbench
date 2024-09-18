import React from "react";
import Button from "../../atoms/button";
import bubbleSort from "../../../algorithms/bubble-sort/bubble-sort";
import { getRandomNumberArray } from "../../../algorithms/utils/get-random-number-array";

export const MainThreadDemo = ({ defaultValue = 5 }) => {
  const [nextValue, setNextValue] = React.useState<number | null>(null);
  const [value, setValue] = React.useState<number | null>(null);
  const [result, setResult] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (value !== null) {
      setResult(bubbleSort(getRandomNumberArray(value)));
    }
  }, [value]);

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
          Change value and click 'Sort':
        </label>
        <input
          id="main-thread-demo-input"
          className="mb-2"
          type="number"
          value={nextValue ?? defaultValue}
          onChange={(e) => setNextValue(parseInt(e.target.value))}
        />
        <Button
          onClick={() => nextValue && setValue(nextValue)}
          title="Sort"
          disabled={value !== null && value !== result?.length}
        >
          {(value &&
            value !== result?.length &&
            `Sorting random ${value} numbers...`) ||
            "Sort"}
        </Button>
        {value && result && (
          <p className="text-1xl text-blue-200">
            Done sorting {result.length} numbers:{" "}
            {result.length > 0 ? `${result.slice(0, 5).join(", ")}...` : "none"}
          </p>
        )}
      </div>
    </div>
  );
};

export default MainThreadDemo;
