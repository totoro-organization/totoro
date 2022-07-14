import { isNumberArray, isObjectArray, isStringArray } from './isArray';

function sortNumberArrayByAscOrder(items: number[]) {
  if (isNumberArray(items)) {
    return items.sort(sortItems);
  }
}

function sortStringArrayByAscOrder(items: string[]) {
  if (isStringArray(items)) {
    return items.sort(sortItems);
  }
}

function sortObjectArrayByAscOrder(items: any[], key: string) {
  if (isObjectArray(items)) {
    return items.sort((a, b) =>
      a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    );
  }
}

function sortItems(compared: number | string, comparing: number | string) {
  if (compared < comparing) return -1;
  if (compared > comparing) return 1;
  return 0;
}

export {
  sortStringArrayByAscOrder,
  sortNumberArrayByAscOrder,
  sortObjectArrayByAscOrder
};
