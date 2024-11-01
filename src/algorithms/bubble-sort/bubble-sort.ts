const bubbleSort = (
  arr: number[],
): { sorted: number[]; timeElapsed: number } => {
  performance.mark("bubble-sort-start");
  let n = arr.length;
  const sorted = [...arr];
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (sorted[i] > sorted[i + 1]) {
        [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  performance.mark("bubble-sort-end");
  return {
    sorted,
    timeElapsed: Math.floor(
      performance.measure("bubble-sort", "bubble-sort-start", "bubble-sort-end")
        .duration,
    ),
  };
};

export default bubbleSort;
