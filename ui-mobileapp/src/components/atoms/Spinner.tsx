import styled from "styled-components/native";

import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export type SpinnerProps = {
  thickness?: number;
  size?: number;
};

export default function Spinner({ thickness = 3, size = 2 }: SpinnerProps) {
  const rotateValue = useRef(new Animated.Value(0));

  const spin = rotateValue?.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    rotateValue?.current &&
      Animated.loop(
        Animated.timing(rotateValue?.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing?.linear,
        })
      ).start();
  }, [rotateValue]);

  return (
    <Wrapper $size={size}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <SpinnerIcon $thickness={thickness} $size={size} />
      </Animated.View>
    </Wrapper>
  );
}

const Wrapper = styled.View<{ $size?: number }>`
  width: ${({ $size }) => $size && `${$size}em`};
  height: ${({ $size }) => $size && `${$size}em`};
`;

const SpinnerIcon = styled.View<{ $thickness?: number; $size: number }>`
  border: ${({ $thickness }) => $thickness && `${$thickness}px`} solid #ffffff50;
  border-radius: 50%;
  border-top-color: #ffff;
  width: ${({ $size }) => $size && `${$size}em`};
  height: ${({ $size }) => $size && `${$size}em`};
`;
