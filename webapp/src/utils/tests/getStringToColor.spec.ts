import { getStringToColor } from '../getStringToColor';

describe('getStringToColor', () => {
  it.each([
    ['Robert', '#a2a937'],
    ['Catapulte', '#2d1775'],
    ["Tester c'est douté", '#405d4f']
  ])(
    `should convert "%s" to hex code color`,
    (inputValue: string, expectedOutput: string) => {
      expect(getStringToColor(inputValue)).toEqual(expectedOutput);
    }
  );
});
