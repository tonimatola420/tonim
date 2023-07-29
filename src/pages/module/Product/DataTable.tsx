import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select, DatePicker } from 'antd';
// import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { selectDeleteState, selectListState, } from "@/stores/reducers/erpSlice";
import { selectLedgerTotals, fetchLedgerList, } from "@/stores/reducers/ledger.slice";
import useOnFetch from '@/utils/hooks/useOnFetch';
// import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/product.config';

const numberFormat = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function DataTable({ DropDownRowMenu, AddNewItem }:
    { DropDownRowMenu: ({ row }: any) => JSX.Element, AddNewItem: ({ config }: any) => JSX.Element }): JSX.Element {
    let { entity, relations, dataTableColumns, dataTableTitle } = config;
    const [form] = Form.useForm(); const dispatch = useAppDispatch();
    const listState = useSelector(selectListState);
    const { result: listResult, isLoading: listIsLoading } = listState;
    const { pagination, items } = listResult;

    let lTotals = useSelector(selectLedgerTotals); const { baltot, totcr, totdr } = lTotals;
    const { totqty } =totdr;

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
                    <Col className="gutter-row" span={6}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} >Total Qty : </p>
                        <InputNumber style={{ width: '100%' }}
                            readOnly className="moneyInput" value={totqty}
                            min={0} controls={false} addonAfter={''}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} > Total Amount : </p>
                        <InputNumber
                            readOnly className="moneyInput" value={totcr}
                            min={0} controls={false} addonAfter={'₹'}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} > Avg Rate : </p>
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