import { fetcher } from './fetcher';

import { IDisplayProductsProps, IProductObject } from './types';

export const getProducts = async () => {
  // console.log('somak calling getProducts here......');
  return await fetcher('/api/products/top', {
    method: 'GET',    
  });
  // return await (await fetch(`http://127.0.0.1:5000/api/products/top`)).json();
};

export const getAllProducts = async (page: number, keyword: string): Promise<IDisplayProductsProps| null> => {
  // console.log('hurruyup aabc somak+++++++++',page, keyword);
  const data: IDisplayProductsProps | null = await fetcher(`/api/products?keyword=${keyword}&pageNumber=${page}`, {
    method: 'GET',
  });  
  // console.log('hurruyup aabc somak+++++++++',page, await JSON.stringify(data));
  return await data;
};

export const getProductById = async (id: string): Promise<IProductObject| null> => {
  
  const data: IProductObject | null = await fetcher(`/api/products/${id}`, {
    method: 'GET',
  });  
  // console.log('hurruyup aabc somak+++++++++', await JSON.stringify(data));
  return await data;
};

export const userLogin = async () => {
  return await fetcher('/api/users/login', {
    method: 'GET',
    body: {
      email: 'admin@example.com',
      password: '123456',      
    },     
  });  
};

export const userLoginPost = async (email: string, password: string) => {
  // await axios.get(`/subs/search/${name}`)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // const res = await axios.post("/api/users/login", {
  //   email: 'admin@example.com',
  //   password: '123456',      
  // }, config);

  const  data  = await fetcher(`/api/users/login`, {
    method: 'POST',
    body: {
      email: email,
      password: password,
    },     
  });

  localStorage.setItem('userInfo', await JSON.stringify(data));

  return data;

};

export const userPostProductReview = async (productId: string, review: {rating: string, comment: string}) => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : [];  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfoFromStorage.token}`,
    },    
  };
  console.log('somakilaaa....', userInfoFromStorage.token,'==',productId, '==', review.comment, '==' ,review.rating);
  const  data  = await fetcher(`/api/products/${productId}/reviews`, {
    method: 'POST',
    body: {
      rating: review.rating,
      comment: review.comment,
    },
    config,
  });
  return data;
};

export const listUsers = async () => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : []
  // console.log('somakilaaa....', userInfoFromStorage.token);
  const config = {
    headers: {
      Authorization: `Bearer ${userInfoFromStorage.token}`,
    },
    
  }
  return await fetcher('/api/users', {
    method: 'GET',
    config,
  });
//   fetch("http://127.0.0.1:5000/api/users",
// {
//     method: 'GET',
//     headers: { Authorization: `Bearer ${userInfoFromStorage.token}`,
//      },    
//   }).then(req => req.text()).then(console.log)
  // return await (await fetch(`http://127.0.0.1:5000/api/products/top`)).json();
};
