import React from "react";
import styled from "styled-components/native";
import Box from "../atoms/Box";
import Spacer from "../atoms/Spacer";
import { Text } from "../atoms/Text";

type JobDetailProps = {
  Icon: JSX.Element;
  title: string | undefined;
  text: string | undefined;
};

export default function JobDetail({ Icon, title, text }: JobDetailProps) {
  return (
    <Box alignItems="center">
      <IconWrapper>{Icon}</IconWrapper>

      <Spacer axis="horizontal" size={1} />

      <Box flexDirection="column">
        <Text color="grey" size="sm">
          {title}
        </Text>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
}

const IconWrapper = styled.View`
  padding: ${({ theme }) => theme.spacing[3.5]};
  background-color: ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.border.radius.md};
`;
