export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'dark' | 'milk' | 'white' | 'gift-boxes';
  rating: number;
  inStock: boolean;
  weight: string;
  ingredients: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}