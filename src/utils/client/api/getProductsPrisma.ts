import { fetcher } from './fetcher';
// import axios from "axios";
import { IDisplayProductsProps, IProductObject } from '../../hooks/products.types';

export interface IProductObj {
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
    reviews: string[],    
    createdAt: Date,
    updatedAt: Date,    
  }

// export const getProducts = async () => {
//   // console.log('somak calling getProducts here......');
//   return await fetcher('/api/products/top', {
//     method: 'GET',    
//   });
//   // return await (await fetch(`http://127.0.0.1:5000/api/products/top`)).json();
// };

export const getAllPrismaProducts = async (): Promise<IProductObject[] | null> => {
  const data = await fetch(`/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },    
  })

  return data.json();
};