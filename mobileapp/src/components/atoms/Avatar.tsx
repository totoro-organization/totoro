import React from "react";
import styled from "styled-components/native";
import getNameInitials from "../../common/utils/getNameInitials";
import { User } from "../../models/user";
import { Text } from "./Text";

type AvatarProps = {
  src?: string;
  user?: User;
};

// FIXME: Remove src prop and replace by user.avatar
export default function Avatar({ user, src }: AvatarProps) {
  return (
    <Container>
      {user && (
        <Text color="white" size="xl">
          {getNameInitials(`${user.firstname} ${user.lastname}`)}
        </Text>
      )}

      {src && (
        <StyledImage
          imageStyle={{ borderRadius: 400 }}
          source={{ uri: src }}
          resizeMode="cover"
        />
      )}
    </Container>
  );
}

const Container = styled.View`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.grey[900]};
  border-radius: 400px;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.ImageBackground`
  width: 80px;
  height: 80px;
`;
