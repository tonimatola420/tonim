import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select, DatePicker } from 'antd';
// import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { selectDeleteState, selectListState, fetchList, resetAction } from "@/stores/reducers/erpSlice";
// import { selectDeleteState, selectListState, selectUpdateState, resetAction, editItem } from "@/stores/reducers/erpSlice";
// import { selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/ledger.slice";
// import { selectDeleteState, selectListState, selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/erpSlice";
import useOnFetch from '@/utils/hooks/useOnFetch';
// import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/system.config';

const numberFormat = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function DataTable({ DropDownRowMenu, AddNewItem }:
    { DropDownRowMenu: ({ row }: any) => JSX.Element, AddNewItem: ({ config }: any) => JSX.Element }): JSX.Element {
    const dispatch = useAppDispatch();
    // dispatch(resetAction({ keyState: 'list' }));
    let { entity, relations, dataTableColumns, dataTableTitle } = config;
    const [form] = Form.useForm();
    const listState = useSelector(selectListState);
    const { result: listResult, isLoading: listIsLoading } = listState;
    const { pagination, items } = listResult;
    // console.log('9JULY2023-20:37=>', JSON.stringify(items));
    dataTableColumns = [
        ...dataTableColumns,
        {
            dataIndex: ['rake', 'rams_totvol'],
            title: 'RakeVol(L)',
            render: (text: any, record: any) => {
                return {
                    props: {
                        style: { color: parseInt(text) >= 1680 ? "red" : parseInt(text) > 0 ? "#fa8c16" : "green" }
                    },
                    children: <div>{text}</div>
                };
            }
        },
    ];

    let ctxitems = [];
    if (items[0].rast_qty) {
        ctxitems = items.map((item: any) => {
            const { rast_qty, product } = item;
            const { prms_unqnty } = product;
            const rast_vol = rast_qty * prms_unqnty;
            item = { ...item, rast_vol };
            return item;
        });
    }
    // const ctxitems = items.map((item: any) => {
    //     const { rast_qty, product } = item;
    //     const { prms_unqnty } = product;
    //     const rast_vol = rast_qty * prms_unqnty;
    //     item = { ...item, rast_vol };
    //     return item;
    // });

    const onSubmit = (fieldsValue: any) => {
        console.log('dokomoto... ',
            form.getFieldsValue(['system']).system ? JSON.stringify([{ rake: { system: { id: form.getFieldsValue(['system']).system } } }]) : '{}'
        );
        const { system, rake } = fieldsValue;
        // const conditions = [{rast_qty: Not(0)}];        
        const options = {
            page: '1', relations: JSON.stringify({ product: true, rake: { system: true, }, }),
            conditions: form.getFieldsValue(['system']).system ? JSON.stringify([{ rake: { system: { id: form.getFieldsValue(['system']).system } } }]) : ''
        };
        const body = { entity, options };
        dispatch(fetchList(entity, options));
    };

    const handelDataTableLoad = useCallback((pagination: any) => {
        // console.log('doramho',form.getFieldsValue(['system']).system);
        const options = {
            page: pagination.current || '1', relations: JSON.stringify({ product: true, rake: { system: true, }, }),
            conditions: form.getFieldsValue(['system']).system ? JSON.stringify([{ rake: { system: { id: form.getFieldsValue(['system']).system } } }]) : ''
        };
        dispatch(fetchList(entity, options));
    }, []);

    useEffect(() => {
        const options = {
            page: '1',
            relations: JSON.stringify({ product: true, rake: { system: true, }, }),
            //  conditions: JSON.stringify([{ rast_qty: 0, },]), };
            jsonData: '{}'
        };
        //  const options = { page: '1', 
        //  relations: JSON.stringify({ product: true, rake: { system: true, }, }), jsonData: '{}' };
        dispatch(fetchList(entity, options));
    }, []);

    return (
        <>
            <div className="pb-4" style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[0, 0]}>
                    <Col span={2}><h1 className="pb-4 text-md font-normal text-center">{dataTableTitle}</h1></Col>
                    <Col span={18}>
                        <Form form={form} layout="inline" onFinish={onSubmit}>
                            <Form.Item name="system" style={{ padding: '0px 0px', width: '42%', float: 'left' }} >
                                <AutoCompleteAsync entity={'system'} displayLabels={['syms_name']} searchFields={'syms_name'} />
                            </Form.Item>
                            <Form.Item><Button type="primary" htmlType="submit">Search</Button></Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Table
                columns={dataTableColumns} rowKey={(item) => item.id} dataSource={ctxitems}
                pagination={{ ...pagination, showSizeChanger: false, }} loading={listIsLoading} onChange={handelDataTableLoad}
            />
        </>
    );
}