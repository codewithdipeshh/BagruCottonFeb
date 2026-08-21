export type ProductId = string | number;

export type SareeProduct = {
  id: ProductId;
  name: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  description: string;
  images: string[];
  category?: string;
  badge?: string;
  discount?: string;
  color?: string;
  rating?: number;
  inStock?: boolean;
};
