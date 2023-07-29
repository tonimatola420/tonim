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
            <Form.Item name="ptms_code" label="Customer Code" rules={[{ required: true, message: 'Please input Customer Code!', },]} >
                <Input />
            </Form.Item>
            <Form.Item name="ptms_name" label="Customer Name" ><Input /></Form.Item>
            <Form.Item name="ptms_nicknm" label="Customer Nickname" ><Input /></Form.Item>
            <Form.Item name="ptms_vat" label="Customer Vat" ><Input /></Form.Item>
            <Form.Item name="ptms_pan" label="Customer PAN" ><Input /></Form.Item>
            <Form.Item name="ptms_excise" label="Customer Excise" ><Input /></Form.Item>
            <Form.Item name="ptms_phone" label="Customer Phone" ><Input /></Form.Item>
            <Form.Item name="ptms_addr" label="Customer Address"  >
                <TextArea placeholder="Address" autoSize={{ minRows: 2, maxRows: 3 }} style={{ width: '100%', borderRadius: '5px' }} />
            </Form.Item>
            <Form.Item name="ptms_desc" label="Description" >
                <TextArea autoSize={{ minRows: 2, maxRows: 3 }} style={{ width: '100%', borderRadius: '5px' }} />
            </Form.Item>
            <Form.Item name="sector" label="Sector" rules={[{ required: true, message: 'Please select SECTOR!' }]} >
                <AutoCompleteAsync entity={'sector'} displayLabels={['sems_name']} searchFields={'sems_name'} />
            </Form.Item>
        </div>
    );
}




