import React from "react";
import styled from "styled-components/native";

type AvatarProps = {
  src: string;
};

export default function Avatar({ src }: AvatarProps) {
  return (
    <Container>
      {/* TODO: Add initial usersssss name? */}

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
`;

const StyledImage = styled.ImageBackground`
  width: 80px;
  height: 80px;
`;
