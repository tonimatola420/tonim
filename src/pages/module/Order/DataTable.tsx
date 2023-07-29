import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
//import { DatePicker } from 'antd';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from '@/utils/client/utils';
// import { config } from './config';
import { config } from '@/utils/client/configs/order.config';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { selectDeleteState, selectListState, fetchList } from "@/stores/reducers/erpSlice";
import { useAppDispatch } from '@/stores/reducers/store';

export default function DataTable({ DropDownRowMenu, AddNewItem }:
    { DropDownRowMenu: ({ row }: any) => JSX.Element, AddNewItem: ({ config }: any) => JSX.Element }): JSX.Element {
    let dtpfrmdate, dtptodate;
    const [dtfrmdate, setDtfrmdate] = useState(dayjs(new Date()).subtract(60, 'days').format('YYYY-MM-DD'));
    const [dttodate, setDttodate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [netBalance, setNetBalance] = useState(0);

    let { entity, relations = '', dataTableColumns, dataTableTitle } = config;
    const [form] = Form.useForm();

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

    const dispatch = useAppDispatch();
    const listState = useSelector(selectListState);
    const { result: listResult, isLoading: listIsLoading } = listState;
    const { pagination, items } = listResult;

    const onSubmit = (fieldsValue: any) => { };

    const handelDataTableLoad = useCallback((pagination: any) => {
        dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD'); dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        const allfieldsvalue = { frmdate: dtpfrmdate, todate: dtptodate, ledger: form.getFieldValue("ledger") };
        const options = { page: pagination.current || 1, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };
        dispatch(fetchList(entity, options));
    }, []);

    useEffect(() => {
        dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD');
        dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        const options = { page: pagination.current || 1, relations: relations, jsonData: '{}' };
        dispatch(fetchList(entity, options));
    }, []);

    const handleFrmDateChange = (value: dayjs.Dayjs | null, dateString: string): void => {
        dtpfrmdate = value; setDtfrmdate(dayjs(value).subtract(0, 'days').format('DD-MM-YYYY'));
    };
    const handleToDateChange = (value: dayjs.Dayjs | null, dateString: string): void => {
        dtptodate = value; setDttodate(dayjs(value).subtract(0, 'days').format('DD-MM-YYYY'));
    };


    return (
        <>
            <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[12, -5]}>
                    <Col span={18}>
                        <Form key={`${uniqueId()}`} form={form} layout="inline" onFinish={onSubmit}>
                            <Form.Item name="frmdate" rules={[{ required: true, type: 'object', },]} initialValue={dayjs().subtract(60, 'days')} style={{ width: '19%' }} >
                                <DatePicker onChange={handleFrmDateChange} placeholder='From Date' format={'MM/DD/YYYY'} />
                            </Form.Item>
                            <Form.Item name="todate" rules={[{ required: true, type: 'object', },]} initialValue={dayjs().add(0, 'days')} style={{ width: '19%' }} >
                                <DatePicker onChange={handleToDateChange} placeholder='To Date' format={'MM/DD/YYYY'} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item><Button type="primary" htmlType="submit">Filter</Button></Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Table columns={dataTableColumns} rowKey={(item) => item.id} dataSource={items}
                pagination={pagination} loading={listIsLoading} onChange={handelDataTableLoad}
            />

        </>
    );
}