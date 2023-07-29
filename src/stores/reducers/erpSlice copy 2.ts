import React, { useState } from 'react';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { IDisplayProductsProps, IProductObject } from '../../utils/client/api/types';
import { getSearchedItems, getList, delItemById, editItemById } from '@/utils/client/api/ledgerApis';
import useOnFetch from '@/utils/hooks/useOnFetch';
import { consolepe } from '@/utils/client/utils';
import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

interface ITotals { baltot: number, totcr: number, totdr: number };
interface IState { [key: string]: any, };
const initialState: IState = {
  current: { result: null, },
  list: { result: { items: [], pagination: { current: 1, pageSize: 10, showSizeChanger: false, total: 1, }, }, isLoading: false, isSuccess: false, current: null, },
  create: { result: null, current: null, isLoading: false, isSuccess: false, },
  update: { result: null, current: null, isLoading: false, isSuccess: false, },
  delete: { result: null, current: null, isLoading: false, isSuccess: false, },
  search: { result: [], current: null, isLoading: false, isSuccess: false, },
  // ledgerTotals: { baltot: 0, totcr: 0, totdr: 0 },
};

export const erpSlice = createSlice({  name: "erp", initialState,
  reducers: { resetState(state, action) { state = initialState},
    currentItem(state, action) { state.current.result = action.payload; },
    requestLoading(state, action) { state[action.payload.keyState].isLoading = true; },
    requestFailed(state, action) { state[action.payload.keyState].isLoading = false; state[action.payload.keyState].isSuccess = false; },
    requestSuccess(state, action) { //console.log('18JUN23-10:10:17 AM', JSON.stringify(action));      
      state[action.payload.keyState].result = action.payload.result; state[action.payload.keyState].isLoading = false;
      state[action.payload.keyState].isSuccess = true; state[action.payload.keyState].current = null;
      // console.log('SOMAKtANKA18JUN23-10:29:29 AM', JSON.stringify(state[action.payload.keyState].result));
    },
    currentAction(state, action) { 
      // state = { ...state, [action.payload.keyState]: { ...state[action.payload.keyState], 
      //     current: state.list.result.items.find((item: any) => item.id === action.payload.id), }, };
      state[action.payload.keyState].current = state.list.result.items.find((item: any) => item.id === action.payload.id);
      state[action.payload.keyState].isSuccess = false;
    },
    resetAction(state, action) { 
      // state = { ...state, [action.payload.keyState]: { ...initialState[action.payload.keyState],  }, };
      state[action.payload.keyState] =  initialState[action.payload.keyState];
    },
    // setTotals(state, action) { state.ledgerTotals = action.payload; },
    delItemFrmState(state, action) {
      for (let n = 0; n < state.list.result.items!.length; n++) {
        if (state.list.result.items![n].id == action.payload.id) { state.list.result.items!.splice(n, 1); break; }
      }
    },
    editItemInState(state, action) { 
      erpSlice.caseReducers.delItemFrmState(state, {payload: { id: action.payload.id }, type: 'deleted'});
      state.list.result.items!.push({ ...action.payload.options, id: action.payload.id });
    },
  },    
});

export const { resetState, currentItem, requestLoading, requestFailed, requestSuccess, currentAction, resetAction, delItemFrmState, editItemInState, } = erpSlice.actions;
export const selectUpdateState = (state: AppState) => state.erp.update;
export const selectDeleteState = (state: AppState) => state.erp.delete;
export const selectListState = (state: AppState) => state.erp.list;

// export const selectLedgerTotals = (state: AppState) => state.erp.ledgerTotals;
export default erpSlice.reducer;

interface IOptions { [key: string]: any; }
export function fetchList(entity: string, options: IOptions = {}) {
  return async function fetchListThunk(dispatch: any, getState: any) {
      dispatch(requestLoading({keyState: 'list'}));
      try {          
          const data: any = await getList(entity, options);
          // console.log('somak 13JUN 09:25:52 PM = ', JSON.stringify(ldata));
          if (data.success) {            
            const result = { items: data.result, pagination: { current: parseInt(data.pagination.page, 10),
                pageSize: 10, total: parseInt(data.pagination.count, 10), },  };
            // console.log('18JUN2023-10:03:56 AM', JSON.stringify(result));
            dispatch(requestSuccess({keyState: 'list', result: result }));
          }          
      } catch (err) { console.log(err); dispatch(requestFailed({keyState: 'list'})); }
  };
}
// export function fetchLedgerList(entity: string, options: IOptions = {}) {
//       return async function fetchLedgerListThunk(dispatch: any, getState: any) {
//           dispatch(requestLoading({keyState: 'list'}));
//           try {          
//               const data: any = await getList(entity, options);
//               // console.log('somak 13JUN 09:25:52 PM = ', JSON.stringify(ldata));
//               if (data.success) {
//                 const baltot = data.result.pop(); const totcr = data.result.pop(); const totdr = data.result.pop();
//                 const result = { items: data.result, pagination: { current: parseInt(data.pagination.page, 10),
//                     pageSize: 10, total: parseInt(data.pagination.count, 10), },  };
//                 // console.log('18JUN2023-10:03:56 AM', JSON.stringify(result));
//                 dispatch(requestSuccess({keyState: 'list', result: result }));
//                 dispatch(setTotals({baltot, totcr, totdr}));
//               }
              
//           } catch (err) { console.log(err); dispatch(requestFailed({keyState: 'list'})); }
//       };
//   }

  export function deleteItem(entity: string, id: string) {
    return async function deleteItemThunk(dispatch: any, getState: any) {
      dispatch(requestLoading({keyState: 'delete'}));
        try {
            const data: any = await delItemById(entity, id);
            // console.log('somak 13JUN 09:25:52 PM = ', JSON.stringify(lgrdata));
            if (data.success) {
              dispatch(requestSuccess({keyState: 'delete', result: data.result}));
              dispatch(delItemFrmState({ id }));
            }
            
        } catch (err) {
            console.log(err);
            dispatch(requestFailed({keyState: 'delete'}));
        }
    };
}

export function editItem(entity: string, id: string, options: IOptions = {}) {
  return async function editItemThunk(dispatch: any, getState: any) {
    dispatch(requestLoading({keyState: 'update'}));
      try {
          const data: any = await editItemById(entity, id, options);
          // console.log('somak 13JUN 09:25:52 PM = ', JSON.stringify(lgrdata));
          if (data.success) {
            dispatch(requestSuccess({keyState: 'update', result: data.result}));
            dispatch(editItemInState({ id, options }));
          }
          
      } catch (err) {
          console.log(err);
          dispatch(requestFailed({keyState: 'delete'}));
      }
  };
}
