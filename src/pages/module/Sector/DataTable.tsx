import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select, DatePicker } from 'antd';
// import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { selectDeleteState, selectListState, fetchList } from "@/stores/reducers/erpSlice";
// import { selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/ledger.slice";
// import { selectDeleteState, selectListState, selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/erpSlice";
import useOnFetch from '@/utils/hooks/useOnFetch';
// import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/sector.config';

const numberFormat = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function DataTable({ DropDownRowMenu, AddNewItem }:
    { DropDownRowMenu: ({ row }: any) => JSX.Element, AddNewItem: ({ config }: any) => JSX.Element }): JSX.Element {
    let { entity, relations, dataTableColumns, dataTableTitle } = config;
    dataTableColumns = [
        ...dataTableColumns,
        {
            title: '',
            render: (row: any) => (
                <Dropdown overlay={DropDownRowMenu({ row })} trigger={['click']}>
                    <BiDotsVerticalRounded style={{ cursor: 'pointer', fontSize: '24px' }} />
                </Dropdown>
            ),
        },
    ];

    const [form] = Form.useForm(); const dispatch = useAppDispatch();
    const listState = useSelector(selectListState);
    const { result: listResult, isLoading: listIsLoading } = listState;
    const { pagination, items } = listResult;   

    const onSubmit = (fieldsValue: any) => {
        // console.log('dokomoto', fieldsValue);
        const options = { page: '1', relations: relations, jsonData: JSON.stringify(fieldsValue) };
        const body = { entity, options };
        dispatch(fetchList(entity, options));
    };

    const handelDataTableLoad = useCallback((pagination: any) => {
        const options = { page: pagination.current || '1', relations: relations, jsonData: '{}' };
        dispatch(fetchList(entity, options));
    }, []);

    useEffect(() => {
        const options = { page: 1, relations: '', jsonData: '{}' };
        dispatch(fetchList(entity, options));        
    }, []);

    return (
        <>
            <div className="pb-4" style={{ position: 'relative', width: ' 100%', float: 'right' }}>               
            </div>
            <Table
                columns={dataTableColumns} rowKey={(item) => item.id} dataSource={items}
                pagination={pagination} loading={listIsLoading} onChange={handelDataTableLoad}
            />
        </>
    );
}