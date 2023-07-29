import Banner from './Banner.component';
import Paginate from './Paginate.component';
import Link from "next/link";
import { getProducts } from '../../utils/client/api/getProducts';
import React, { useState, useEffect } from 'react';
import { IDisplayProductsProps, IProductObject } from '../../utils/client/api/types';
// import { useAppGlobalDispatch, useAppGlobalState, DispatchContext, StateContext } from "@/stores/AppGlobalProvider";

const Hero: React.FC<{ products: IProductObject[], pages: string, pageno: string, searchkey: string }> = ({ products, pages, pageno, searchkey }) => {  
  const [topProducts, setTopProducts] = useState<IProductObject[]>();  

  useEffect(() => {
    const myUsers = async () => {
      const data1 = await getProducts();
      setTopProducts(data1!);      
    };
    myUsers();  
  }, []);  

  // console.log('somak balhilu-->', JSON.stringify(topProducts));
  return (
    <main className="mx-auto max-w-6xl px-6">

      {topProducts && <Banner products={topProducts} />}

      <section id="latestproducts" className="mt-4">
        <h1 className="pt-1 text-2xl font-normal text-left">LATEST PRODUCTS</h1>
        <div id="productsgrid" className="mt-10 grid grid-cols-3 sm:grid-cols-4 gap-3 justify-evenly">
          {products && products.map((product) =>
          (<div key={product._id} className="p-3 border rounded-md max-w-xs flex flex-col justify-center items-center gap-3 text-black">
            <Link href={`/produkt/${product._id}`} className="">
              <img src={`${product.image}`} alt="airpods" />
            </Link>
            <h1 className="pt-1 text-sm font-light text-center">{product.name}</h1>
            <ul className="flex items-center gap-x-1">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-yellow-300 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-yellow-300 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-yellow-300 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-yellow-300 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </li>
            </ul>
            <h1 className="text-xs font-light text-center">4 reviews</h1>
            <h1 className="text-xl font-normal text-center">{product.price}</h1>
          </div>)
          )
          }
        </div>
      </section>
      <Paginate pages={Number(pages)} page={Number(pageno)} searchkey={searchkey} />

    </main>
  );
}

export default Hero;