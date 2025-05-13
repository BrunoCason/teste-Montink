import { useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { VariantSelector } from "../components/VariantSelector";
import { CEPChecker } from "../components/CEPChecker";
import type { Product } from "../types/Product";

const product: Product = {
  title: "CAMISETA OVERSIZED",
  price: 99.9,
  images: [
    "/oversized-white.png",
    "/oversized-black.png",
    "/oversized-offwhite.png",
    "/oversized-green.png",
    "/oversized-brown.png",
  ],
  variants: {
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Branco", "Off White", "Verde", "Marrom"],
  },
};

const ProductPage = () => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-8 px-4">
      <ImageGallery
        images={product.images}
        mainImage={mainImage}
        onSelect={setMainImage}
      />
      <div>
        <h1 className="text-2xl font-semibold py-5">{product.title}</h1>
        <div className="border border-gray-200 mb-4">
          <div className="space-y-2 bg-gray-100 border-b border-gray-300 px-4 py-6">
            <p className="text-xl font-bold">{`R$ ${product.price.toFixed(
              2
            )}`}</p>
          </div>

          <div className="p-4 space-y-5">
            <VariantSelector
              label="Tamanho"
              options={product.variants.sizes}
              selected={size}
              onSelect={setSize}
            />

            <VariantSelector
              label="Cor"
              options={product.variants.colors}
              selected={color}
              onSelect={setColor}
            />

            <CEPChecker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
