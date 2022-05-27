import createUsername from "./createUsername";

describe(createUsername.name, () => {
  it.each([
    { firstname: "Mae", lastname: "Wolff", expected: "MaeW" },
    { firstname: "Maelle", lastname: "Moisis", expected: "MaelleM" },
    { firstname: "Pierre", lastname: "Roger de Magnoc", expected: "PierreR" },
  ])(
    "Should convert full name to username",
    ({ firstname, lastname, expected }) => {
      expect(createUsername(firstname, lastname)).toStrictEqual(expected);
    }
  );
});
