export interface Product {
  id: number;
  title: string;
  options: string[];
  values: string[][];
  variants: {
    id: number;
    product_id: number;
    price: string;
    values: string[];
    image_id: number;
    inventory_quantity: number;
    image_url: string;
  }[];
  image_url: string;
  images: {
    id: number;
    product_id: number;
    src: string;
  }[];
}
