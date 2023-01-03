export type Image = {
  id: number;
  name: string;
  src: string;
  alt: string;
  isFront?: true;
};

export type Color = {
  name: string;
  bgColor: string;
  selectedColor: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  isProductCard?: boolean;
  images: Image[];
  colors: Color[];
  description: string;
};
