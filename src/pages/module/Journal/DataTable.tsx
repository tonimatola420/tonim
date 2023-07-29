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
import { config } from '@/utils/client/configs/journal.config';

const numberFormat = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function DataTable({ DropDownRowMenu, AddNewItem }:
    { DropDownRowMenu: ({ row }: any) => JSX.Element, AddNewItem: ({ config }: any) => JSX.Element }): JSX.Element {
    let { entity, relations, dataTableColumns, dataTableTitle } = config;
    const [dtfrmdate, setDtfrmdate] = useState(dayjs(new Date()).subtract(60, 'days').format('YYYY-MM-DD'));
    const [dttodate, setDttodate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
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
    let lTotals = useSelector(selectLedgerTotals); const { baltot, totcr, totdr } = lTotals;

    const onSubmit = (fieldsValue: any) => {
        // console.log('dokomoto', fieldsValue);
        const options = { page: '1', relations: relations, jsonData: JSON.stringify(fieldsValue) };
        const body = { entity, options };
        dispatch(fetchLedgerList(entity, options));
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDttodate(e.target.value); };
    const handleFrmDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDtfrmdate(e.target.value); };

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
                    <Col span={2}><h1 className="pb-4 text-md font-normal text-center">{dataTableTitle}</h1></Col>
                    <Col span={18}>
                        <Form form={form} layout="inline" onFinish={onSubmit}>
                            <Form.Item name="ledger" style={{ padding: '0px 0px', width: '42%', float: 'left' }} >
                                <AutoCompleteAsync entity={'ledger'} displayLabels={['name']} searchFields={'code,name'} />
                            </Form.Item>                            
                            <Form.Item name="frmdate" initialValue={dayjs().subtract(60, 'days')} style={{ width: '19%' }} >
                                <DatePicker onChange={(value, event) => { setDtfrmdate(dayjs(value).subtract(0, 'days').format('YYYY-MM-DD')); }} placeholder='From Date' format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item name="todate" initialValue={dayjs().add(0, 'days')} style={{ width: '19%' }}>
                                <DatePicker onChange={(event) => { setDttodate(dayjs(event).subtract(0, 'days').format('YYYY-MM-DD')); }} placeholder='To Date' format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item><Button type="primary" htmlType="submit">Search</Button></Form.Item>
                        </Form>
                    </Col>
                </Row>                
            </div>
            <Table
                columns={dataTableColumns} rowKey={(item) => item.id} dataSource={items}
                pagination={pagination} loading={listIsLoading} onChange={handelDataTableLoad}
            />
            <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[12, -5]}>
                    <Col span={24}><div className="line"></div></Col>
                    <div className="space10"></div>

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
                            readOnly className="moneyInput" value={ totdr - totcr }
                            min={0} controls={false} addonAfter={'₹'}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>                    
                    <Col className="gutter-row" span={6} offset={0}>
                        <p style={{ paddingLeft: '1px', paddingTop: '5px', }} > Net Balance : </p>                        
                        <InputNumber
                            readOnly className="moneyInput" value={baltot}
                            min={0} controls={false} addonAfter={'₹'}
                            addonBefore={undefined} formatter={(value) => numberFormat(value!)}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
}