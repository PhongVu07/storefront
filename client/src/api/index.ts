import axios from "axios";
import { Order, Product, User } from "types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProductBySlug = async (productSlug: string) => {
  try {
    const { data } = await axiosInstance({
      method: "get",
      url: `/products/${productSlug}`,
    });
    return data?.data as Product;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await axiosInstance({
      method: "get",
      url: `/products`,
    });
    return data?.data as Product[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance({
      method: "get",
      url: `/users`,
    });
    return data?.data as User[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await axiosInstance({
      method: "get",
      url: `/orders`,
    });
    return data?.data as Order[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createOrder = async (order: Order, files?: any) => {
  try {
    await axiosInstance({
      method: "post",
      url: `/orders`,
      data: {
        order,
        files
      }
    });
    return true
  } catch (err) {
    console.log(err);
  }
}