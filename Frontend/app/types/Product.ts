export interface Product {
  id: number;
  product_name: string;
  regular_price: number;
  sale_price: number;
  size: string;
  weight: number;
  life: number;
  rating: number;
  stock: number;
  type: string;
  brand: string;
  category: string;
  subcategory_id: number;
  tag: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface UserProduct  {
  id: number;
  product_name: string;
  regular_price: number;
  sale_price: number;
  tag: string;
  image: string;
  category: string;
  type: string;
  subcategory_id: number;


}

