export interface ImageGalleryProps {
  images: string[];
  mainImage: string;
  onSelect: (img: string) => void;
}