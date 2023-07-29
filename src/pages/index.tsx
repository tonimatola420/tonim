import React, { useState, useEffect } from 'react';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from '@/components/Layout/Layout.component';
import Hero from '@/components/Index/Hero.component';
import { cls, consolepw, consolepe } from '@/utils/client/utils';
import { getAllProducts } from '../utils/client/api/getProducts';
import { IDisplayProductsProps, IProductObject } from '../utils/client/api/types';
import { selectProductsState, setProductsState, updateProductsState } from "@/stores/reducers/productsSlice";
// import FormComponent from '@/components/Ledger/FormComponent';
// import DataTableDropMenu from '@/components/Ledger/DataTableDropMenu';
import DataTableDropMenu from '@/pages/module/Client/Read';

const Index: NextPage = () => {
  return (
    <Layout title="">
      <section className="container grid items-center gap-2 pb-8">      
        {/* <FormComponent /> */}
        <DataTableDropMenu />
      </section>
    </Layout>    
  );
}

export default Index;