const isArray = (array: any) => Array.isArray(array);

const isStringArray = (array: any) => {
  if (isArray(array)) {
    return (
      array.length > 0 &&
      array.every((value) => {
        return typeof value === 'string';
      })
    );
  }
};

const isNumberArray = (array: any) => {
  if (isArray(array)) {
    return (
      array.length > 0 &&
      array.every((value) => {
        return typeof value === 'number';
      })
    );
  }
};

const isObjectArray = (array: any) => {
  if (isArray(array)) {
    return (
      array.length > 0 &&
      array.every((value) => {
        return typeof value === 'object';
      })
    );
  }
};

export { isArray, isStringArray, isNumberArray, isObjectArray };
