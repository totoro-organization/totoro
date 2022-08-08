import Carousel from 'react-material-ui-carousel';
import {
    Paper,
    Typography,
    Box,
    Container,
} from '@mui/material'

import { ItemCarrousel, SettingsT } from 'src/shared/interfaces';

interface ProjectProps
{
  items: ItemCarrousel[],
  settings: SettingsT
}

const CarrouselItems = ({items, settings}: ProjectProps) => {

    return (
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Carousel
          {...settings}
        >
          {
            items.map((item, index) => {
              return <Box
                  key={index}
                  sx={{
                    mb: 12
                  }}
                >
                  <Typography variant="h2" component="h1" gutterBottom sx={{color: "#7068DC", textTransform: "uppercase"}}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{my: 3}}>{item.description}</Typography>
                </Box>
            })
          }
        </Carousel>
      </Container>

    )
}

export default CarrouselItems