import Layout from '@/components/Layout/Layout.component';
import { cls } from '@/utils/client/utils';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { useState, useEffect, useContext } from 'react';
// import FormComponent from '@/components/FormComponent';
import { getAllProducts } from '../utils/client/api/getProducts';
import { IDisplayProductsProps, IProductObject } from '../utils/client/api/types';
import Hero from '@/components/Index/Hero.component';
import SignIn from '@/components/Index/SignIn.component';
import { useRouter } from "next/router";

const Signin: NextPage = () => {
  

  return (
    <Layout title="">
      <SignIn />
    </Layout>
  );
}
export default Signin;