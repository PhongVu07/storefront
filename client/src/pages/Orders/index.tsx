import React, { useState, useEffect } from "react";

import { getAllOrders } from "api";
import { Order } from "types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleGetOrders = async () => {
    const fetchedOrders = await getAllOrders();
    setOrders(fetchedOrders);
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Orders
      </h1>

      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-12">
          <ul
            role="list"
            className="divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            {Array.isArray(orders) && orders.map((order) => (
              <li
                key={order.id}
                className="flex justify-between py-6 sm:py-10"
              >
                <div className="flex-shrink-0">
                  <img
                    src={order.metadata.images[0].src}
                    alt="product image"
                    className="h-24 w-40 rounded-md object-cover object-center sm:h-48 sm:w-80"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-end">
                        <h3 className="text-sm">
                            {order.metadata.name}
                        </h3>
                      </div>
                      <div className="mt-1 flex justify-end text-sm">
                        <p className="text-gray-500">{order.metadata.color}</p>
                      </div>
                      <p className="flex justify-end mt-1 text-sm font-medium text-gray-900">
                        ${order.metadata.price}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </form>
    </main>
  );
}
