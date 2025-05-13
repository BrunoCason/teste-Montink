export interface Product {
  title: string;
  price: number;
  images: string[];
  variants: {
    sizes: string[];
    colors: string[];
  };
}