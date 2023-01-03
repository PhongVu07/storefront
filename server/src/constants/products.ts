import { Product } from '../types/products';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wrist Band',
    slug: 'wrist-band',
    price: '20',
    isProductCard: false,
    images: [
      {
        id: 1,
        name: 'Lorem',
        src:
          'https://cdn.shopify.com/s/files/1/0257/5315/7735/products/rop-blk-back_2000x.png?v=1664927001',
        alt: 'Lorem Ipsum'
      },
      {
        id: 2,
        name: 'Lorem',
        src:
          'https://cdn.shopify.com/s/files/1/0257/5315/7735/products/popl-rop-blk-promo-01_400x.png?v=1664926994',
        alt: 'Lorem Ipsum'
      }
    ],
    colors: [
      {
        name: 'Black',
        bgColor: 'bg-black',
        selectedColor: 'ring-gray-700'
      },
      { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' }
    ],
    description: `<p>Lorem ipsum</p>`
  },
  {
    id: 2,
    name: 'Digital Card',
    slug: 'digital-card',
    price: '15',
    isProductCard: true,
    images: [
      {
        id: 3,
        name: 'Lorem',
        alt: 'Lorem Ipsum',
        src:
          'https://my-kraken-bucket-dev.s3.us-east-2.amazonaws.com/front.png',
        isFront: true
      },
      {
        id: 4,
        name: 'Lorem',
        alt: 'Lorem Ipsum',
        src: 'https://my-kraken-bucket-dev.s3.us-east-2.amazonaws.com/back.png'
      }
    ],
    colors: [],
    description: `<p>Lorem ipsum</p>`
  }
];
