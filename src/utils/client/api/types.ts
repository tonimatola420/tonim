export type Nil<T> = T | null | undefined;

export type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export interface IProductObject {
  _id: string;
  rating: string,
  numReviews: number,
  price: number,
  countInStock: number,
  name: string,
  image: string,
  description: string,
  brand: string,
  category: string,
  user: string,
  reviews: [
    {name: string, comment: string, updatedAt: string},
  ],
  __v: number,
  createdAt: Date,
  updatedAt: Date,
}

export interface IDisplayProductsProps {
  products: IProductObject[],
  pages: string,
  page: string,
}

export interface ICartProduct {
  _id: string,    
  price: number,    
  name: string,
  image: string,
  qty: number,
  countInStock: number,
}

