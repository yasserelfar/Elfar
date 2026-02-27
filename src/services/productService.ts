// Mock product service
// import api from "./api"; // axios instance for real backend

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

let products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    stock: 50,

    price: 1200,
    image:
      "https://m.media-amazon.com/images/I/8166TsnPDyL._AC_SX644_CB1169409_QL70_.jpg",
  },
  {
    id: 2,
    stock: 50,

    name: "Smartphone",
    price: 800,
    image:
      "https://m.media-amazon.com/images/I/41NGdWgVgdL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 3,
    stock: 50,
    name: "Headphones",
    price: 150,
    image:
      "https://m.media-amazon.com/images/I/515FE+S4yLL._AC_UY327_FMwebp_QL65_.jpg",
  },
];

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

export const fetchProducts = async (): Promise<Product[]> => {
  await delay();
  return [...products];
};

export const createProduct = async (prod: Product): Promise<Product> => {
  await delay();
  const newProd = { ...prod, id: products.length + 1 };
  products.push(newProd);
  return newProd;
};

export const updateProduct = async (prod: Product): Promise<Product> => {
  await delay();
  products = products.map((p) => (p.id === prod.id ? prod : p));
  return prod;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await delay();
  products = products.filter((p) => p.id !== id);
};

export default {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
