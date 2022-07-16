import React from "react";
import styled from "styled-components/native";
import getNameInitials from "../../common/utils/getNameInitials";
import { User } from "../../models/user";
import { Text } from "./Text";

// TODO: Rename user to fallback or initials props.
type AvatarProps = {
  src?: string;
  user?: User | undefined | null;
  size?: "md" | "sm";
  type?: "user" | "organization";
};

export default function Avatar({
  user,
  src,
  size = "md",
  type = "user",
}: AvatarProps) {
  return (
    <Container size={size} type={type}>
      {user && (
        <Text color="white" size="xl">
          {getNameInitials(`${user.firstname} ${user.lastname}`)}
        </Text>
      )}

      {src && (
        <StyledImage size={size} source={{ uri: src }} resizeMode="contain" />
      )}
    </Container>
  );
}

const Container = styled.View<Pick<AvatarProps, "size" | "type" | "src">>`
  width: ${({ size }) => (size === "md" ? "80px" : "24px")};
  height: ${({ size }) => (size === "md" ? "80px" : "24px")};
  background-color: ${({ theme, src }) =>
    src ? "white" : theme.colors.core.black.base};
  border-radius: ${({ type, theme }) =>
    type === "user" ? "400px" : theme.border.radius.md};
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.ImageBackground<Pick<AvatarProps, "size">>`
  width: ${({ size }) => (size === "md" ? "80px" : "24px")};
  height: ${({ size }) => (size === "md" ? "80px" : "24px")};
  overflow: hidden;
  background-color: white;
`;
