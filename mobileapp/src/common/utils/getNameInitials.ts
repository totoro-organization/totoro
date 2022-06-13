export default function getNameInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2);
}
