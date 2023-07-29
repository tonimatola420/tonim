import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select, DatePicker } from 'antd';
// import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { selectDeleteState, selectListState, fetchList } from "@/stores/reducers/erpSlice";
import { selectLedgerTotals, } from "@/stores/reducers/ledger.slice";
import useOnFetch from '@/utils/hooks/useOnFetch';
// import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/sale.config';

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

    const onSubmit = (fieldsValue: any) => {
        const { frmdate, todate, product } = fieldsValue;        
        const dtpfrmdate = dayjs(frmdate).format('YYYY-MM-DD');
        const dtptodate = dayjs(todate).format('YYYY-MM-DD');        
        fieldsValue = { frmdate: dtpfrmdate, todate: dtptodate, product };
        const options = { page: 1, relations: relations, jsonData: JSON.stringify(fieldsValue) };        
        dispatch(fetchList(entity, options));
    };
    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDttodate(e.target.value); };
    const handleFrmDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDtfrmdate(e.target.value); };

    const handelDataTableLoad = useCallback((pagination: any) => {
        const dtpfrmdate = dayjs(form.getFieldValue("frmdate").$d).subtract(0, 'days').format('YYYY-MM-DD');
        const dtptodate = dayjs(form.getFieldValue("todate").$d).subtract(0, 'days').format('YYYY-MM-DD');        
        // console.log('handelDataTableLoad...: ', dtpfrmdate, dtptodate);
        const allfieldsvalue = { frmdate: dtpfrmdate, todate: dtptodate, product: form.getFieldValue("product") };
        const options = { page: pagination.current || 1, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };        
        dispatch(fetchList(entity, options));
    }, []);

    useEffect(() => {
        const options = { page: pagination.current || 1, relations: relations, jsonData: '{}' };
        dispatch(fetchList(entity, options));
        // console.log('18JUN2023-09:36:56 AM', JSON.stringify(listState));
    }, []);
        //  style={{ width: ' 100%', }}
    return (
        <div>
            <div className="pb-4" >
                <Row gutter={[0, 0]}>
                    
                    <Col span={52} style={{ width: ' 120%' }}>
                        <Form form={form} layout="inline" onFinish={onSubmit} style={{ width: ' 100%' }} >
                            <Form.Item name="product" style={{ position: 'relative', padding: '0px 4px', width: '22%', float: 'left' }} >
                                <Select>
                                    <Select.Option value="1">1 NO P</Select.Option><Select.Option value="2">2 NO P</Select.Option>
                                    <Select.Option value="3">2 NO B</Select.Option><Select.Option value="4">3 NO P</Select.Option>
                                    <Select.Option value="5">3 NO B</Select.Option><Select.Option value="6">4 NO P</Select.Option>
                                    <Select.Option value="7">4 NO B</Select.Option><Select.Option value="8">GHAMA</Select.Option>
                                    <Select.Option value="9">BATHS</Select.Option><Select.Option value="10">RUBBISH</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="frmdate" initialValue={dayjs().subtract(60, 'days')} style={{ width: '24%' }} >
                                <DatePicker onChange={(value, event) => { setDtfrmdate(dayjs(value).subtract(0, 'days').format('YYYY-MM-DD')); }} placeholder='From Date' format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item name="todate" initialValue={dayjs().add(0, 'days')} style={{ width: '24%' }}>
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
            </div>
        
    );
}