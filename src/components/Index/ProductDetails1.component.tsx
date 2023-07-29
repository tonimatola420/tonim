import { IDisplayProductsProps, IProductObject } from '../../utils/client/api/types';
import { RxArrowLeft, } from 'react-icons/rx';
import Link from "next/link";
import Button from '@/components/UI/Button.component';
// import SignIn from './SignIn.component';
import { Suspense, useEffect, useState } from "react";
import { userLoginPost, userPostProductReview } from '../../utils/client/api/getProducts';
import { useRouter } from "next/router";


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
  const [nos, setNos] = useState<string>('');  

  const uproductreview = async () => {
    const url = `http://127.0.0.1:5000/api/products/${product._id}/reviews`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    };
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ rating, comment }),
    })
      .then((response) => {        
        if (response.ok) {          
          setReviews(reviews => [...reviews, {
            name: userInfo!.name, comment, updatedAt: Date().toLocaleString(),
          }]);          
          return response.json();
        }
        return Promise.reject(response); // 2. reject instead of throw
      })
      .then((json) => {        
        // console.log('all good, token is ready');
      })
      .catch((response) => {
        console.log(response.status, response.statusText);
        // 3. get error messages, if any
        response.json().then((json: any) => {
          console.log(json.message);
          console.log(json);
          setErrorReview(json.message);
        })
      });
  };

  const ulogin = async () => {
    const data = await userLoginPost(email!, password!);    
    setLoginVisible(false);    
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')!));
  }  

  useEffect(() => {    
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')!));    
  }, [])

  return (
    <>
      <main className="mx-auto max-w-6xl px-6" >

        <section id="latestproducts" className="mt-4 ">
          {/* <h1 className="pt-1 text-2xl font-normal text-left">{`${product.name}`}</h1> */}
          <div className='w-[12vw]'>
            <Link href="/" className="text-black"><div className='mb-4 flex gap-2 items-center' ><RxArrowLeft />Back</div></Link>
          </div>
          <div className="flex flex-col items-center space-y-4 sm:flex-row justify-around sm:items-start text-black">
            <img className='w-[33%] h-[44%]' src={`${product.image}`} alt="airpods" />
            <div className=" flex flex-col items-center space-y-2">
              <h1 className="pb-4 text-md font-normal text-center px-6">{product.name}</h1>

              <hr className="w-[70%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <h1 className="text-sm font-light text-center">{product.reviews.length} reviews</h1>

              <hr className="w-[70%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <h1 className="w-[80%] text-xs font-light text-center px-6"><span className='mr-4'>Description:</span>{product.description}</h1>
            </div>

            <div className=" flex flex-col items-start space-y-2 border border-slate-200">
              <h1 className="w-[92%] mt-2 text-xs font-light px-2"><span className='mr-[24%]'>Price:</span><span className='mr-[24%]'>{product.price}</span></h1>
              <hr className="w-[100%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <h1 className="text-xs font-light text-center px-1"><span className='mr-[24%]'>Status:</span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h1>
              <hr className="w-[100%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              { product.countInStock > 0 && 
                  (<div><h1 className="text-xs font-light text-center px-1"><span className='mr-[24%]'>Nos:</span>
                  <select className="h-6 bg-white text-gray-500 text-sm pl-4 border"
                          value={nos}
                          onChange={(e) => setNos(e.target.value) }
                        >                          
                          { Array.from(Array(product.countInStock).keys()).map((i) => (<option value={`${i+1}`}>{i+1}</option>)) }
                        </select>
                  </h1>
                  <hr className="w-[100%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr></div>
                  )
              }              
              
              <div className='mx-auto pb-2'><Button
                color="red"
                buttonDisabled={ product.countInStock > 0 ? false : true }
                handleButtonClick={() => { }}
              >
                Add To Cart
              </Button></div>
            </div>

          </div>
          {loginVisible && (<>
            <div onClick={(e) => { e.preventDefault; setLoginVisible(true); }} className='ml-[28%] p-6 mt-[2vh] w-[40%] z-20 text-white border border-gray-200 rounded absolute'>
              <div className='px-6 py-2 flex flex-col justify-between items-start border border-gray-200 rounded bg-slate-100'>
                <h1 className="text-sm font-light text-center pl-4 text-gray-500 ">UserName:</h1>
                <input className="h-10 w-[100%] bg-white text-gray-500" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                <h1 className="text-sm font-light text-center pl-4 text-gray-500">Password:</h1>
                <input className="h-10 w-[100%] bg-white text-gray-500" type="password" onChange={(e) => { setPassword(e.target.value); }} />
                <div className='mt-4 flex justify-end w-[100%]'>
                  <button type="button" onClick={() => { ulogin(); }} className="h-10 px-2 text-sm text-green-500 border-2 border-solid border-green-500 rounded-lg">LOGIN</button>
                </div>

              </div>
            </div>
            {/* <SignIn /> */}
            {/* <div onClick={(e) => { e.preventDefault; setLoginVisible(false); }} className=' h-[150%] w-[100%] z-[1] bg-transparent top-0 absolute pt-60'>
      
      </div> */}
          </>)}
          <div className='flex flex-col justify-between items-start text-2xl font-medium'>
            REVIEWS
            {reviews && reviews.map((review) => (
              <div className='flex flex-col justify-between items-start text-sm font-light'>
                <h1 className="text-sm font-light text-center pl-4 ">{review.name}</h1>
                <h1 className="text-sm font-light text-center pl-4 ">{review.updatedAt.substring(0, 10)}</h1>
                <h1 className="text-sm font-light text-center pl-4 ">{review.comment}</h1>
                <hr className="w-[100%] h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              </div>
            ))}
            <div className='flex flex-col justify-between items-start text-sm font-light'>
              <h1 className="text-center pl-4 text-xl font-medium">Write a Customer Review</h1>

              {errorReview && (
                <h1 className="text-sm font-light text-center ml-4 mt-2 p-2 bg-red-200 ">
                  {errorReview}.
                </h1>
              )}


              {userInfo   //localStorage.getItem('userInfo')
                ? (
                  <div className='flex flex-col justify-between items-start text-sm font-light border border-slate-200 p-4 rounded space-y-2'>
                    <h1 className="text-sm font-light text-center pl-4 ">Rating</h1>
                    <select className="h-10 bg-white text-gray-300 text-sm font-light pl-4 border"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </select>
                    <h1 className="text-sm font-light text-center pl-4 ">Comment</h1>
                    <input className="h-10 w-[100%] bg-white text-gray-500 border" type="text" onChange={(e) => setComment(e.target.value)} />
                    <button type="button" onClick={() => { uproductreview(); }} className="h-10 px-2 text-sm text-green-500 border-2 border-solid border-green-500 rounded-lg">SUBMIT</button>
                  </div>
                )
                : (
                  <h1 className="text-sm font-light text-center ml-4 mt-2 p-2 bg-blue-200 ">
                    Please <a onClick={() => { setLoginVisible(true); }} className="text-blue-700 cursor-pointer">✎ SIGN IN</a> to write a review.
                  </h1>

                )
              }

              {/* <h1 className="text-sm font-light text-center ml-4 mt-2 p-2 bg-blue-200 ">
                Please <a onClick={() => { setLoginVisible(true);}} className="text-blue-700 cursor-pointer">✎ SIGN IN</a> to write a review.
              </h1> */}
            </div>
          </div>


        </section>


      </main>

      {loginVisible && (<>
        <div onClick={(e) => { e.preventDefault; setLoginVisible(false); }} className=' h-[80%] w-[100%] z-[1] bg-transparent top-0 absolute pt-60'>

        </div></>)}

    </>
  );
}

export default ProductDetails;