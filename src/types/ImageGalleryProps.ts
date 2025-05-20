interface Image {
  id: number;
  product_id: number;
  src: string;
}

export interface ImageGalleryProps {
  images: Image[];
  mainImage: string;
  onSelect: (img: string) => void;
}
