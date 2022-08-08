import { Box, styled, BoxProps } from "@mui/material";
import { ProjectProps } from "src/shared/interfaces";
import CarrouselItems from "./components/CarouselItems";

const CarouselContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
  }
}));

function Carousel({ items, settings, ...props }: ProjectProps & BoxProps) {
  return (
    <CarouselContainer {...props}>
        <CarrouselItems items={items} settings={settings} />
    </CarouselContainer>
  )
}

export default Carousel