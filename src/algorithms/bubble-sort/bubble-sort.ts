const bubbleSort = (arr: number[]): number[] => {
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
  return sorted;
};

export default bubbleSort;
