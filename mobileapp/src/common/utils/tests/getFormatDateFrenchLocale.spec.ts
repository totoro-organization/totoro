import getFormatDateFrenchLocale from "../getFormatDateFrenchLocale";

describe(getFormatDateFrenchLocale.name, () => {
  it.each([
    [new Date("2021-04-29T10:40:06.247Z"), "29/04/2021"],
    [new Date("December 17, 1995 03:24:00"), "17/12/1995"],
    [new Date("1995, 11, 17"), "17/11/1995"],
    [`${new Date("2021-04-29T10:40:06.247Z")}`, "29/04/2021"],
    [`${new Date("December 17, 1995 03:24:00")}`, "17/12/1995"],
    [`${new Date("1995, 11, 17")}`, "17/11/1995"],
    [`${new Date("2021-04-29T10:40:06")}`, "29/04/2021"],
  ])(
    "should convert date %p",
    (inputValue: string | Date, expectedOutput: string) => {
      expect(getFormatDateFrenchLocale(inputValue)).toEqual(expectedOutput);
    }
  );

  it.each([
    [new Date("2021-04-29T10:40:06"), "29/04/2021, 10:40:06"],
    [new Date("December 17, 1995 03:24:00"), "17/12/1995, 03:24:00"],
    [`${new Date("2021-04-29T10:40:06")}`, "29/04/2021, 10:40:06"],
    [`${new Date("December 17, 1995 03:24:00")}`, "17/12/1995, 03:24:00"],
    [`${new Date("2021-04-29T10:40:06")}`, "29/04/2021, 10:40:06"],
  ])(
    "should convert date %p and output time",
    (inputValue: string | Date, expectedOutput: string) => {
      expect(getFormatDateFrenchLocale(inputValue, true)).toEqual(
        expectedOutput
      );
    }
  );
});
