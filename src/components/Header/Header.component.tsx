import Head from 'next/head';
import { cls } from '@/utils/client/utils';
import { Suspense, useEffect, useState } from "react";
// import Navbar from './Navbar.component';
import { useRouter } from "next/router";
import Link from "next/link";
interface IHeaderProps {
  title: string;
}

const Header = ({ title }: IHeaderProps) => {  
  const [searchkey, setSearchkey] = useState<string>();
  const router = useRouter();
  const [hamburgerHidden, setHamburgerHidden] = useState(false);  

  const onhamburgerClick = () => {
    setHamburgerHidden(!hamburgerHidden);
  };
  const onCARTClick = () => {    
  };
  
  return (
    <>
      <Head>
        <title>Next.js Webshop {title}</title>
        <meta name="description" content="WooCommerce webshop" />
        <meta name="keywords" content="Ecommerce, WooCommerce" />
        <meta
          property="og:title"
          content="Nextjs Ecommerce with Woocommerce"
          key="pagetitle"
        />
      </Head>
      <header className="sticky top-0 z-20 bg-slate-800 text-white">
        <section className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <div id="logosection" className={cls("flex justify-between", hamburgerHidden ? "flex-col items-start gap-1" : "items-center space-x-12")}>
            <h1 className="text-xl font-normal">
              {/* <a href="/">E-Shop</a> */}
              <Link href="/">E-Shop</Link>
            </h1>
            <div id="search" className={cls("sm:flex justify-between space-x-4", hamburgerHidden ? "items-start" : "hidden items-center")}>
              <input className="h-10 bg-white text-black" type="text" onChange={(e) => setSearchkey(e.target.value)} />
              <button type="button" onClick={()=>{router.push(`/?keyword=${searchkey}&pageNumber=${1}`)}} className="h-10 px-2 text-sm text-green-500 border-2 border-solid border-green-500">SEARCH</button>
            </div>
            <nav id="mobile-nav" className={cls("sm:hidden flex flex-col justify-between items-start gap-1", hamburgerHidden ? "hidden" : "")}>
              <h1 className="text-sm font-light">
                <a href="#hero">🛒 CART</a>
              </h1>
              <h1 className="text-sm font-light">
                <a href="/signin">✎ SIGN IN</a>
              </h1>
            </nav>
          </div>

          <div>
            <button id="hamburger-button"
              className={cls("relative h-8 w-8 cursor-pointer text-3xl sm:hidden", hamburgerHidden ? "toggle-btn" : "")}
              onClick={onhamburgerClick}>
              <div
                className="absolute top-4 -mt-0.5 h-1 w-8 rounded bg-white transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-white after:transition-all after:duration-500 after:content-['']">
              </div>
            </button>
            <nav className="hidden sm:flex justify-between items-center space-x-4">
              <h1 className="text-sm font-light">
                <a onClick={onCARTClick} href="#hero">🛒 CART1</a>
              </h1>
              <h1 className="text-sm font-light">
                <a href="/signin">✎ SIGN IN</a>
              </h1>
            </nav>
          </div>

        </section>
      </header>
      
    </>
  );
}
export default Header;
