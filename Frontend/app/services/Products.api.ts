import { API_BASE_URL } from "@/app/config/api.config";
import { Product } from "@/app/types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE_URL}/product`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();
  return data;
};
