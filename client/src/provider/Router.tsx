import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from 'components/Layout'
import Storefront from "pages/Storefront";
import ProductDetail from "pages/ProductDetail";
import Orders from "pages/Orders";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Storefront />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/product/:productSlug",
        element: <ProductDetail />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default Router;
