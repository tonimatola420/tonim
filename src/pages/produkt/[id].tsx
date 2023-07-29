// Components
import Hero from '@/components/Index/Hero.component';
import ProductDetails from '@/components/Index/ProductDetails.component';
import Layout from '@/components/Layout/Layout.component';

// Types
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType, } from 'next';
import React, { useState, useEffect, useContext } from 'react';

import { getProductById } from '../../utils/client/api/getProducts';

const ProduktDetail: NextPage = ({ prdtls, }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <Layout title="">
      {prdtls && <ProductDetails product={prdtls}  />}
    </Layout>
  );
}
export default ProduktDetail;

export const getServerSideProps: GetServerSideProps = async ({
    query: { id },
  }) => {
    const productDetails = await getProductById(id!.toString());

    // console.log('somak rankor', JSON.stringify(productDetails));
  
    return {
      props: {
        prdtls: JSON.parse(JSON.stringify(productDetails)),
      },
      // revalidate: 120,
    };

  };
  