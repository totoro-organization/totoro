import React from "react";
import styled from "styled-components/native";
import getNameInitials from "../../common/utils/getNameInitials";
import { User } from "../../models/user";
import { Text } from "./Text";

type AvatarProps = {
  src?: string;
  user?: User;
  size?: "md" | "sm";
  type?: "user" | "organization";
};

// FIXME: Remove src prop and replace by user.avatar
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
        <StyledImage
          size={size}
          imageStyle={{ borderRadius: type === "user" ? 400 : 6 }}
          source={{ uri: src }}
          resizeMode="cover"
        />
      )}
    </Container>
  );
}

const Container = styled.View<Pick<AvatarProps, "size" | "type">>`
  width: ${({ size }) => (size === "md" ? "80px" : "24px")};
  height: ${({ size }) => (size === "md" ? "80px" : "24px")};
  background-color: ${({ theme }) => theme.colors.grey[900]};
  border-radius: ${({ type, theme }) =>
    type === "user" ? "400px" : theme.border.radius.md};
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.ImageBackground<Pick<AvatarProps, "size">>`
  width: ${({ size }) => (size === "md" ? "80px" : "24px")};
  height: ${({ size }) => (size === "md" ? "80px" : "24px")};
`;
