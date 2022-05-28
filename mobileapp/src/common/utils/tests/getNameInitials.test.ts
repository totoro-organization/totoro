import getNameInitials from "../getNameInitials";

describe(getNameInitials.name, () => {
  it.each([
    { fullName: "Mae Wolff", expected: "MW" },
    { fullName: "Maelle Moisis", expected: "MM" },
    { fullName: "Jean-Pierre Foucault", expected: "JF" },
  ])("Should convert full name to name initials", ({ fullName, expected }) => {
    expect(getNameInitials(fullName)).toStrictEqual(expected);
  });
});
