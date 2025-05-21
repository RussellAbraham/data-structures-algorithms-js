/**
 * Performs a linear search.
 * @param {Array} arr - The array to search.
 * @param {*} val - The value to find.
 * @returns {number} - Index of the target, or -1 if not found.
 */

export default function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}

// linearSearch([34,51,1,2,3,45,56,687], 100);
