
export interface IProductObject {
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
  }