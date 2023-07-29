import { fetcher } from './fetcher';

// export const buyProduct = async (product: Prisma.Product) => {
//   const stripeItem = transformProduct(product);

//   return await fetcher(`/api/checkout/products/`, {
//     method: 'POST',
//     body: [stripeItem],
//     schema: stripeSessionSchema,
//   });
// };

export const buyProduct = async () => {  

  return await fetcher(`/api/products`, {
    method: 'POST',
    body: {
      name: 'Sample name somak',
      price: 0,
      user: 11,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    },    
  });
};

