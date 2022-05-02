import styled from "styled-components/native";

type Props = {
  axis: "horizontal" | "vertical";
  size: number;
};

function getHeight({ axis, size }: Props) {
  return axis === "horizontal" ? "1px" : `${size * 16}px`;
}

function getWidth({ axis, size }: Props) {
  return axis === "vertical" ? "1px" : `${size * 16}px`;
}

/**
 * @param size expressed in em units (1em = 16px)
 * @param axis 'horizontal' | 'vertical' is the direction of spacing
 */
export default styled.View`
  width: ${getWidth};
  min-width: ${getWidth};
  height: ${getHeight};
  min-height: ${getHeight};
`;
