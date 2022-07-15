import { ImageListItem, ImageList  } from "@mui/material"
import { config } from "src/services/config";

interface ImageGalleryProps {
  images: {
    image: string,
    jobs_id: string,
    original_name: string,
    type: string
  }[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={`${config.server + item.image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${config.server + item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={config.server + item.original_name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
)

export default ImageGallery