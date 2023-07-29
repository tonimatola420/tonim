import React from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, Table, Row, Col, Space, Form, InputNumber, Select, DatePicker, Input, } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';

export default function FormItems({ maxAmount = undefined, handleJrdateChange = undefined }: 
    { maxAmount?: number | undefined, handleJrdateChange: ((value: dayjs.Dayjs | null, dateString: string) => void) | undefined }) {
    // ((value: Dayjs | null, dateString: string) => void)
    const { TextArea } = Input;
    return (
        <div>
            <Form.Item name="date" label="Date" initialValue={dayjs().add(0, 'days')} >
                <DatePicker onChange={handleJrdateChange} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="chlnNo" label="Chalan No" rules={[{ required: true, message: 'Please Input Chalan!' }]} ><Input /></Form.Item>
            <Form.Item name="product" label="Product" rules={[{ required: true, message: 'Please Select Product!' }]} >
                <Select>
                    <Select.Option value="1">1 NO P</Select.Option><Select.Option value="2">2 NO P</Select.Option>
                    <Select.Option value="3">2 NO B</Select.Option><Select.Option value="4">3 NO P</Select.Option>
                    <Select.Option value="5">3 NO B</Select.Option><Select.Option value="6">4 NO P</Select.Option>
                    <Select.Option value="7">4 NO B</Select.Option><Select.Option value="8">GHAMA</Select.Option>
                    <Select.Option value="9">BATHS</Select.Option><Select.Option value="10">RUBBISH</Select.Option>
                </Select>
            </Form.Item>            
            <Form.Item label="Quantity" name="qty" rules={[{ required: true, message: 'Quantity Is Required' }]} >
                <InputNumber style={{ width: '100%' }} min={0} max={maxAmount}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                />
            </Form.Item>
            <Form.Item label="Rate" name="rate" rules={[{ required: true, message: 'Rate Is Required' }]} >
                <InputNumber style={{ width: '100%' }} min={0} max={maxAmount}
                    formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                />
            </Form.Item>
        </div>
    );
}
