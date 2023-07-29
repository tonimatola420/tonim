import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { IDisplayProductsProps, IProductObject } from '../../utils/client/api/types';

export interface ProductsState {
  productsState: IProductObject[];
}

const initialState: ProductsState = {
  productsState: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    HYDRATE(state, action) {
      console.log("HYDRATE", action.payload);
    },
    setProductsState(state, action) {
      // console.log('somamk oye', JSON.stringify(action.payload));
      // state.productsState.push(...action.payload); // = action.payload;
      // state.productsState = [];
      state.productsState = action.payload;
    },
    addProductsState(state, action) {
      // console.log('somamk oye', JSON.stringify(action.payload));
      state.productsState.push(action.payload); // = action.payload;     
    },
    updateProductsState(state, action) {
      action.payload!.map((item1: IProductObject) => {
        for (let n = 0; n < state.productsState!.length; n++) {
          if (state.productsState![n]._id == item1._id) {
            state.productsState!.splice(n, 1);
            break;
          }
        }
        state.productsState!.push(item1);
      });      
    },
  },

  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     console.log("HYDRATE", action.payload);
  //     return {
  //       ...state,
  //       ...action.payload.products,
  //     };
  //   },
  // },
});

export const { setProductsState, updateProductsState } = productsSlice.actions;

export const selectProductsState = (state: AppState) => state.products?.productsState;

export default productsSlice.reducer;
