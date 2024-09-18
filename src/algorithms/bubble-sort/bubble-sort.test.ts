import { describe, it, expect } from "vitest";
import bubbleSort from "./bubble-sort";

describe("bubbleSort", () => {
  it("should sort an array of numbers in ascending order", () => {
    const arr = [5, 3, 8, 4, 2];
    const sortedArr = bubbleSort(arr);
    expect(sortedArr).toEqual([2, 3, 4, 5, 8]);
  });

  it("should handle an empty array", () => {
    const arr: number[] = [];
    const sortedArr = bubbleSort(arr);
    expect(sortedArr).toEqual([]);
  });

  it("should handle an array with one element", () => {
    const arr = [1];
    const sortedArr = bubbleSort(arr);
    expect(sortedArr).toEqual([1]);
  });

  it("should handle an array with identical elements", () => {
    const arr = [2, 2, 2, 2];
    const sortedArr = bubbleSort(arr);
    expect(sortedArr).toEqual([2, 2, 2, 2]);
  });

  it("should handle an already sorted array", () => {
    const arr = [1, 2, 3, 4, 5];
    const sortedArr = bubbleSort(arr);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle an array sorted in descending order", () => {
    const arr = [5, 4, 3, 2, 1];
    const sortedArr = bubbleSort(arr);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle large arrays", () => {
    const arr = [...Array(10000)].map(() => ~~(Math.random() * 1000000));
    const sortedArr = bubbleSort(arr);
    const expectedArr = [...arr].sort((a, b) => a - b);
    expect(sortedArr).toEqual(expectedArr);
  });
});
