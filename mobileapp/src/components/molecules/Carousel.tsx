import React, { useEffect, useRef } from "react";
import { Dimensions, FlatList, ImageBackground } from "react-native";
import { Asset } from "expo-asset";

import Box from "../atoms/Box";
import { Text } from "../atoms/Text";
import styled from "styled-components/native";
import Spacer from "../atoms/Spacer";

interface CarouselData {
  order?: number;
  image?: any;
  title: string;
  text: string;
}

type CarouselItemProps = {
  data: CarouselData;
};

const CarouselItem = ({ data }: CarouselItemProps) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const imageURI = Asset.fromModule(data.image).uri;

  return (
    <ItemContainer
      width={`${windowWidth}px`}
      height={`${windowHeight}px`}
      flexDirection="column"
    >
      <Illustration source={{ uri: imageURI }} resizeMode="cover" />

      <Spacer axis="vertical" size={2} />

      <Text size="xxl">{data.title}</Text>

      <Spacer axis="vertical" size={2} />

      <Text color="grey">{data.text}</Text>
    </ItemContainer>
  );
};

type CarouselProps = {
  data: CarouselData[];
  carouselIndex: number;
  isScrolled?: boolean;
};

export default function Carousel({
  data,
  carouselIndex = 0,
  isScrolled = false,
}: CarouselProps) {
  const carouselRef = useRef<FlatList>(null);

  useEffect(() => {
    carouselRef?.current?.scrollToIndex({
      index: carouselIndex,
      animated: true,
    });
  }, [carouselIndex]);

  return (
    <FlatList
      ref={carouselRef}
      data={data}
      initialScrollIndex={carouselIndex}
      style={{ flex: 1 }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={isScrolled}
      keyExtractor={(item) => item.key}
      renderItem={({ item, index }) => {
        return <CarouselItem key={index} data={item} />;
      }}
    />
  );
}

const ItemContainer = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing[28]};
  padding: 0 ${({ theme }) => theme.spacing[6]};
`;

const Illustration = styled(ImageBackground)`
  width: 126px;
  height: 126px;
`;
