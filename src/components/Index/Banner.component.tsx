import { cls } from '@/utils/client/utils';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled, RxBorderDotted, RxDot } from 'react-icons/rx';
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import Link from "next/link";
import { IDisplayProductsProps, IProductObject } from '../../utils/client/api/types';

interface ITopProductsProps {
    products: IProductObject[],
}

let count = 0;
let slideInterval: NodeJS.Timer;

export default function Banner({ products }: ITopProductsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const removeAnimation = () => {
        slideRef.current!.classList.remove("fade-anim");
    };

    useEffect(() => {
        slideRef.current!.addEventListener("animationend", removeAnimation);
        slideRef.current!.addEventListener("mouseenter", pauseSlider);
        slideRef.current!.addEventListener("mouseleave", startSlider);
        startSlider();
        return () => {
            pauseSlider();
        };
    }, []);

    const startSlider = () => {
        slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);
    };

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    const handleOnNextClick = () => {
        count = (count + 1) % products.length;
        setCurrentIndex(count);
        // slideRef.current!.classList.add("fade-anim");
    };
    const handleOnPrevClick = () => {
        const productsLength = products.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        // slideRef.current!.classList.add("fade-anim");
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    // console.log('somak asaad==>', products[currentIndex].id);

    return (
        <>
            {/* { products && (<div>{ JSON.stringify(products) }</div>) } */}
            <div ref={slideRef} className="w-full h-[10%] select-none relative">
                <div className=''>
                    <Link href={`/produkt/${products[currentIndex]._id}`} className="">
                        <img style={{ animation: 'flash 1.5s .5s' }} className='w-[52vh] h-[52vh] m-auto py-1 transition-all ease-in-out duration-500 delay-[200ms]' src={products[currentIndex].image} alt="" />
                    </Link>

                    <h1 className="pt-1 text-sm font-light text-center">{products[currentIndex].name}</h1>
                </div>

                <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
                    <button
                        className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
                        onClick={handleOnPrevClick}
                    >
                        <AiOutlineVerticalRight size={30} />
                    </button>
                    <button
                        className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
                        onClick={handleOnNextClick}
                    >
                        <AiOutlineVerticalLeft size={30} />
                    </button>
                </div>
                <div className='flex top-4 justify-center py-2'>
                    {products.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className='text-2xl cursor-pointer'
                        >
                            {slideIndex == currentIndex ? <RxDotFilled /> : <RxDot />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

