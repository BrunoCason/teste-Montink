import type { ImageGalleryProps } from "../types/ImageGalleryProps";

export const ImageGallery = ({ images, mainImage, onSelect }: ImageGalleryProps) => (
  <div className="space-y-4 max-w-2xl">
    <img
      src={mainImage}
      alt="Imagem principal do produto"
      className="w-full object-cover aspect-square sm:aspect-auto sm:h-auto min-h-[500px]"
    />
    <div className="flex gap-3 overflow-x-auto sm:justify-center">
      {images.map((img, i) => (
        <img
          key={img.id}
          src={img.src}
          alt={`Miniatura ${i + 1}`}
          onClick={() => onSelect(img.src)}
          className={`w-20 h-20 flex-shrink-0 object-cover cursor-pointer`}
        />
      ))}
    </div>
  </div>
);
