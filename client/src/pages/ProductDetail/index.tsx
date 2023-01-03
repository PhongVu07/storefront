import React, { useState, useEffect, useRef } from "react";
import { RadioGroup, Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import { createOrder, getProductBySlug } from "api";
import { Color, Product, User } from "types";
import ProductImage from "components/ProductImage";
import CardInfoSection from "components/CardInfoSection";
import { downloadImage, getImageBlog } from "utils/cardImage";

const ProductDetail: React.FC = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState<Product>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<Color>();
  const [userData, setUserData] = useState<User | undefined>();

  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  const isProductCard = product && product.isProductCard;

  const handleGetProduct = async (slug?: string) => {
    if (slug) {
      const product = await getProductBySlug(slug);
      if (product) {
        setProduct(product);
        setSelectedColor(product.colors[0]);
      }
    }
  };

  const downloadDesign = () => {
    if (frontCardRef.current) {
      downloadImage(frontCardRef.current, "front.png");
    }
    if (backCardRef.current) {
      downloadImage(backCardRef.current, "back.png");
    }
  };

  const handleCreateOrder = async (e: any) => {
    e.preventDefault();
    try {
      const metadata = {} as any;
      let files = [] as any
      if (isProductCard) {
        if (backCardRef.current) {
          files = [await getImageBlog(backCardRef?.current)];
        } else {
          await setSelectedImageIndex(1)
          files.push(await getImageBlog(backCardRef?.current))
        }
      } else {
        metadata.color = selectedColor?.name;
      }
      if (product) {
        const order = {
          metadata,
          productId: product.id,
        };
        await createOrder(order, files);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleGetProduct(productSlug);
  }, [productSlug]);

  if (!product) {
    return <p>Loading</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group
            as="div"
            className="flex flex-col-reverse"
            selectedIndex={selectedImageIndex}
            // @ts-ignore
            onChange={setSelectedImageIndex}
          >
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images.map((image) => (
                  <Tab
                    key={image.src}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only"> {image.name} </span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image.src}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {product.images.map((image) => (
                <Tab.Panel key={image.id}>
                  <ProductImage
                    previewRef={image.isFront ? frontCardRef : backCardRef}
                    image={image}
                    userData={userData}
                    showUserData={!image.isFront}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                {(product.colors || []).length > 0 && (
                  <h3 className="text-sm text-gray-600">Color</h3>
                )}

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-2"
                >
                  <span className="flex items-center space-x-3">
                    {product.colors.map((color) => {
                      return (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor ? color.bgColor : "bg-black",
                              "h-8 w-8 border border-black border-opacity-10 rounded-full"
                            )}
                          />
                        </RadioGroup.Option>
                      );
                    })}
                  </span>
                </RadioGroup>
              </div>

              {isProductCard && (
                <CardInfoSection
                  userData={userData}
                  setUserData={setUserData}
                  downloadDesign={downloadDesign}
                />
              )}
              <div className="sm:flex-col1 mt-10 flex justify-between">
                <button
                  onClick={(e) => handleCreateOrder(e)}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Order
                </button>
              </div>

              <div className="sm:flex-col1 mt-10 flex"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
