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
            <Form.Item name="sems_name" label="Sector Name" rules={[{ required: true, message: 'Please input Sector Name!', },]} >
                <Input />
            </Form.Item>
            <Form.Item name="sems_from" label="Sector From" >
                <Input />
            </Form.Item>
            <Form.Item name="sems_to" label="Sector To" >
                <Input />
            </Form.Item>
            <Form.Item name="sems_range" label="Sector Range" >
                <Input />
            </Form.Item>
        </div>
    );
}




