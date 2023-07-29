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
            <Form.Item name="clms_code" label="Supplier Code" rules={[{ required: true, message: 'Please input Supplier Code!', },]} >
                <Input />
            </Form.Item>
            <Form.Item name="clms_name" label="Supplier Name" >
                <Input />
            </Form.Item>
            <Form.Item name="clms_nicknm" label="Supplier Nickname" >
                <Input />
            </Form.Item>
            <Form.Item name="clms_phone" label="Supplier Phone" >
                <Input />
            </Form.Item>
            <Form.Item name="clms_addr" label="Supplier Address"  >
                <TextArea placeholder="Address" autoSize={{ minRows: 2, maxRows: 3 }} style={{ width: '100%', borderRadius: '5px' }} />
            </Form.Item>
            <Form.Item name="clms_desc" label="Description" >
                <TextArea autoSize={{ minRows: 2, maxRows: 3 }} style={{ width: '100%', borderRadius: '5px' }} />
            </Form.Item>
        </div>
    );
}




