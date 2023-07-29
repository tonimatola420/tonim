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
import { erpSlice } from "./erpSlice";
import { selectDeleteState, selectListState, requestLoading, requestSuccess } from "@/stores/reducers/erpSlice";

interface ITotals { baltot: number, totcr: number, totdr: number };
interface IState { [key: string]: any, };
const initialState: IState = { ledgerTotals: { baltot: 0, totcr: 0, totdr: 0 }, };

export const ledgerSlice = createSlice({
  name: "ledger", initialState,
  reducers: {
    resetState(state, action) { return initialState; },
    // setTotals(state, action) { state.ledgerTotals = action.payload; },
    setTotals(state, action) { return { ...state, ledgerTotals: action.payload, }; },
  },
});

export const { resetState, setTotals, } = ledgerSlice.actions;
export const selectLedgerTotals = (state: AppState) => state.ledger.ledgerTotals;
export default ledgerSlice.reducer;

interface IOptions { [key: string]: any; }
export function fetchLedgerList(entity: string, options: IOptions = {}) {
  return async function fetchLedgerListThunk(dispatch: any, getState: any) {
    // erpSlice.caseReducers.requestLoading(getState().erp, {payload: {keyState: 'list'}, type: 'list'});
    // getState().erp.list.isLoading = true;
    dispatch(requestLoading({keyState: 'list'}));
    try {
      const data: any = await getList(entity, options);
      // console.log('somak 13JUN 09:25:52 PM = ', JSON.stringify(ldata));
      if (data.success) {
        const baltot = data.result.pop(); const totcr = data.result.pop(); const totdr = data.result.pop();
        const result = {
          items: data.result, pagination: {
            current: parseInt(data.pagination.page, 10),
            pageSize: 10, total: parseInt(data.pagination.count, 10),
          },
        };
        // console.log('18JUN2023-10:03:56 AM', JSON.stringify(getState().erp.list.result.pagination.pageSize));
        // getState().erp.list.result.pagination.pageSize = 12;
        // erpSlice.caseReducers.requestSuccess(getState().erp, {payload: { keyState: 'list', result: result }, type: 'list'});
        dispatch(requestSuccess({keyState: 'list', result: result }));
        dispatch(setTotals({ baltot, totcr, totdr }));
        console.log('18JUN2023-10:03:56 AM', JSON.stringify(getState().erp.list.result.items));
      }

    } catch (err) { console.log(err); erpSlice.caseReducers.requestFailed(getState().erp, {payload: {keyState: 'list'}, type: 'list'}); }
  };
}


