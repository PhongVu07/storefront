import React, { useState, useEffect } from "react";
import ProductCard from "components/ProductCard";
import { Product } from "types";
import { getAllProducts } from "api";

const Storefront: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  const handleGetProducts = async () => {
    const fetchedProducts = await getAllProducts()
    setProducts(fetchedProducts)
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Array.isArray(products) && products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Storefront;
