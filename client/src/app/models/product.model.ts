export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string | null;
  created_at: string;
}

export interface ProductListResponse {
  items: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
