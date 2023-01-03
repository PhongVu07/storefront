import React from "react";
import { Link } from "react-router-dom";
import { Product } from "types";

interface IProps {
  product: Product;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  return (
    <div className="group relative">
      <Link to={`product/${product.slug}`}>
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={`products/${product.slug}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">{product.colors[0].name}</p> */}
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
