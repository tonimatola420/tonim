import Head from 'next/head';
import { cls } from '@/utils/client/utils';
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface IHeaderProps {
    title: string;
}

const SignIn = () => {    

    return (
        
        <div onClick={(e)=>{ e.preventDefault; }} className='ml-[28%] p-6 mt-[2vh] w-[40%] z-20 text-white border border-gray-200 rounded absolute'>
            <div className='px-6 py-2 flex flex-col justify-between items-start border border-gray-200 rounded bg-slate-100'>
                <h1 className="text-sm font-light text-center pl-4 text-gray-500 ">UserName:</h1>
                <input className="h-10 w-[100%] bg-white text-gray-500 border-none" type="text" />
                <h1 className="text-sm font-light text-center pl-4 text-gray-500">Password:</h1>
                <input className="h-10 w-[100%] bg-white text-gray-500" type="password" />
                <div className='mt-4 flex justify-end w-[100%]'>
                <button type="button" onClick={() => { }} className="h-10 px-2 text-sm text-green-500 border-2 border-solid border-green-500 rounded-lg">LOGIN</button>
                </div>

            </div>
        </div>
        

    );
}
export default SignIn;
