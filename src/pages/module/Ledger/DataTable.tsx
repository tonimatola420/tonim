import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select, DatePicker } from 'antd';
// import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { selectDeleteState, selectListState, } from "@/stores/reducers/erpSlice";
import { selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/ledger.slice";
// import { selectDeleteState, selectListState, selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/erpSlice";
import useOnFetch from '@/utils/hooks/useOnFetch';
// import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/ledger.config';

const numberFormat = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function DataTable({ DropDownRowMenu, AddNewItem }:
    { DropDownRowMenu: ({ row }: any) => JSX.Element, AddNewItem: ({ config }: any) => JSX.Element }): JSX.Element {
    let { entity, relations, dataTableColumns, dataTableTitle } = config;
    dataTableColumns = [
        ...dataTableColumns,
        {
            dataIndex: "balance",
            title: "Balance",
            render: (text: any, record: any) => {
                return {
                    props: {
                        style: { color: parseInt(text) >= 0 ? "black" : "red" }
                    },
                    children: <div>{text}</div>
                };
            }
        },
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

    let lTotals = useSelector(selectLedgerTotals); const { baltot, totcr, totdr } = lTotals;

    const onSubmit = (fieldsValue: any) => {
        // console.log('dokomoto', fieldsValue);
        const options = { page: '1', relations: relations, jsonData: JSON.stringify(fieldsValue) };
        const body = { entity, options };
        dispatch(fetchLedgerList(entity, options));
    };

    const handelDataTableLoad = useCallback((pagination: any) => {
        const options = { page: pagination.current || '1', relations: relations, jsonData: '{}' };
        dispatch(fetchLedgerList(entity, options));
    }, []);

    useEffect(() => {
        const options = { page: pagination.current || 1, relations: relations, jsonData: '{}' };
        dispatch(fetchLedgerList(entity, options));
        // console.log('18JUN2023-09:36:56 AM', JSON.stringify(listState));
    }, []);

    return (
        <>
            <div className="pb-4" style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[0, 0]}>
                    <Col span={3}><h1 className="pb-4 text-md font-normal text-center">{dataTableTitle}</h1></Col>
                    <Col span={18}>
                        <Form form={form} layout="inline" onFinish={onSubmit}>
                            <Form.Item name="ledger" style={{ padding: '0px 20px', width: '49%', float: 'left' }} >
                                <AutoCompleteAsync entity={'ledger'} displayLabels={['name']} searchFields={'code,name'} />
                            </Form.Item>
                            <Form.Item><Button type="primary" htmlType="submit">Search</Button></Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row gutter={[0, 0]}>
                    <Col className="gutter-row" span={6}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} >Debit Total : </p>
                        <InputNumber
                            readOnly className="moneyInput" value={totdr}
                            min={0} controls={false} addonAfter={'₹'}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} > Credit Total : </p>
                        <InputNumber
                            readOnly className="moneyInput" value={totcr}
                            min={0} controls={false} addonAfter={'₹'}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} > Total Balance : </p>
                        <InputNumber
                            readOnly className="moneyInput" value={baltot}
                            min={0} controls={false} addonAfter={'₹'}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>
                </Row>
            </div>

            <Table
                columns={dataTableColumns} rowKey={(item) => item.id} dataSource={items}
                pagination={pagination} loading={listIsLoading} onChange={handelDataTableLoad}
            />
        </>
    );
}