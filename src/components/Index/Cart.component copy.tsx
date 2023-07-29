import { Suspense, useEffect, useState } from "react";
import { RxArrowLeft, } from 'react-icons/rx';
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICartProduct, IProductObject } from '../../utils/client/api/types';
import Button from '@/components/UI/Button.component';
import { selectCartProductsState, setCartProductsState, updateItemCartProductsState, deleteItemCartProductsState } from "@/stores/reducers/cartProductsSlice";
import { userLoginPost, userPostProductReview } from '../../utils/client/api/getProducts';

interface uinfo {
  _id: string,
  name: string,
  email: string,
  isAdmin: boolean,
  token: string,
}

interface review {
  name: string,
  comment: string,
  updatedAt: string,
}

const ProductDetails: React.FC<{ product: IProductObject }> = ({ product }) => {
  const router = useRouter();
  const [loginVisible, setLoginVisible] = useState<boolean>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [userInfo, setUserInfo] = useState<uinfo>();
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [errorReview, setErrorReview] = useState<string>('');
  const [reviews, setReviews] = useState<review[]>(product.reviews);
  const [nos, setNos] = useState<string[]>([]);
  const cartProductsState = useSelector(selectCartProductsState);
  const dispatch = useDispatch();
  let selectnos: string[];

  return (
    <>
      <main className="mx-auto max-w-6xl px-6" >

        <section id="latestproducts" className="mt-4 ">
          {/* <h1 className="pt-1 text-2xl font-normal text-left">{`${product.name}`}</h1> */}
          
          <div className="flex flex-col items-center space-y-4 sm:flex-row justify-around sm:items-start text-black">            
            <div className="w-[64%] flex flex-col items-start space-y-2">
              <h1 className="pb-4 text-lg font-normal text-center px-6">SHOPPING CART</h1>
              { cartProductsState.map((item: ICartProduct, i: number) => (
                <div key={i} className="ml-4 mr-8 flex flex-row justify-between items-center">
                  <img className='w-[12%] h-[18%]' src={`${item.image}`} alt="airpods" />
                  <h1 className="text-sm font-light text-center">{item.name}</h1>
                  <h1 className="text-sm font-light text-center">{item.price}</h1>
                  <select className="h-6 w-12 bg-white text-gray-500 text-sm pl-4 border"
                            value={nos[i]}
                            onChange={(e) => { selectnos[i] = e.target.value; setNos([...nos, e.target.value]) } }
                          >                          
                            { Array.from(Array(item.countInStock).keys()).map((i) => (<option value={`${i+1}`}>{i+1}</option>)) }
                  </select>
                  <hr className="w-[100%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
                </div>
              )) }
              
              
              {/* <h1 className="w-[40%] text-xs font-light text-center">{product.description}</h1> */}
            </div>

            <div className=" flex flex-col items-start space-y-2 border border-slate-200">            
            <h1 className="pb-1 text-sm font-normal text-center px-6">SUBTOTAL ({cartProductsState.length + 1}) ITEMS</h1>
              
              <h1 className="text-xs font-extralight text-center px-6 text-gray-500">${product.price}</h1>
              <hr className="w-[100%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>                            
              
              <div className='mx-4 pb-2'><Button
                color="blue"
                buttonDisabled={ product.countInStock > 0 ? false : true }
                handleButtonClick={() => { }}
              >
                PROCEED TO CHECKOUT
              </Button></div>
            </div>

          </div>

        </section>

      </main>      

    </>
  );
}

export default ProductDetails;