import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions, FlatList } from "react-native";
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

  return (
    <ItemContainer
      width={`${windowWidth}`}
      height={`${windowHeight}`}
      flexDirection="column"
    >
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
