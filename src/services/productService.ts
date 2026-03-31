// Product service using real backend API
import api from "./api";

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  description?: string;
  image: string;
  stock: number;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  stock?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}

export const fetchProducts = async (
  page = 1,
  limit = 100,
  search?: string,
): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) {
    params.append("search", search);
  }
  const response = await api.get(`/products?${params}`);
  return response.data;
};

export const createProduct = async (
  data: CreateProductData,
): Promise<Product> => {
  const response = await api.post("/products/addproduct", data);
  return response.data;
};

export const updateProduct = async (
  productId: string,
  data: UpdateProductData,
): Promise<Product> => {
  const response = await api.put(`/products/${productId}`, data);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await api.delete(`/products/${productId}`);
};

export default {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
