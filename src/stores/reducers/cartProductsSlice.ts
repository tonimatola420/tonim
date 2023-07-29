import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ICartProduct } from '../../utils/client/api/types';

export interface CartProductsState {
  cartProductsState: ICartProduct[];
}

const initialState: CartProductsState = {
  cartProductsState: [],
};

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    setCartProductsState(state, action) {
      // console.log('somamk oye', JSON.stringify(action.payload));
      // state.productsState.push(...action.payload); // = action.payload;
      // state.productsState = [];
      state.cartProductsState = action.payload;
    },
    addCartProductsState(state, action) {
      // console.log('somamk oye', JSON.stringify(action.payload));
      state.cartProductsState.push(action.payload); // = action.payload;     
    },
    updateItemCartProductsState(state, action) {
      action.payload!.map((item1: ICartProduct) => {
        for (let n = 0; n < state.cartProductsState!.length; n++) {
          if (state.cartProductsState![n]._id == item1._id) {
            state.cartProductsState!.splice(n, 1);
            break;
          }
        }
        state.cartProductsState!.push(item1);
      });      
    },
    deleteItemCartProductsState(state, action) {
      action.payload!.map((item1: ICartProduct) => {
        for (let n = 0; n < state.cartProductsState!.length; n++) {
          if (state.cartProductsState![n]._id == item1._id) {
            state.cartProductsState!.splice(n, 1);
            break;
          }
        }
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

export const { setCartProductsState, updateItemCartProductsState, deleteItemCartProductsState } = cartProductsSlice.actions;

export const selectCartProductsState = (state: AppState) => state.cartProducts?.cartProductsState;

export default cartProductsSlice.reducer;
