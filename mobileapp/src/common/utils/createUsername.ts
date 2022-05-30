export default function createUsername(
  firstName: string,
  lastName: string
): string {
  const lastnameInitial = lastName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 1);

  return `${firstName}${lastnameInitial}`;
}
