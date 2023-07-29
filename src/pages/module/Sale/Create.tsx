import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect, Upload,
  Slider, Rate, Typography, Space, Divider,
} from 'antd';
import dayjs from 'dayjs';
import { saveItem } from '@/utils/client/api/ledgerApis';
import successHandler from '@/utils/hooks/successHandler';
import { useDispatch, useSelector } from "react-redux";
import { } from "@/stores/reducers/erpSlice";
import ERPLayout from '@/components/Layout/ERPLayout';
import FormItems from './FormItems';
// import { config } from './config';
import { config } from '@/utils/client/configs/sale.config';
const { Option } = Select;
const { Title } = Typography;

export default function Create() {
  const { entity, module, HEADER_SECTION } = config;  let vardate;
  const [frmdate, setFrmdate] = useState(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
  const [form] = Form.useForm();  
  const handleJrdateChange: ((value: dayjs.Dayjs | null, dateString: string) => void) = (value: dayjs.Dayjs | null, dateString: string): void => { setFrmdate(dateString); };
  const onSubmit = async (fieldsValue: any) => {
    const { date, ...flds } = fieldsValue;
    let year = frmdate.slice(6, 10); let month = frmdate.slice(3, 5); let date1 = frmdate.slice(0, 2);
    vardate = dayjs(year + month + date1).format('YYYY-MM-DD');
    fieldsValue = { date: vardate, ...flds };
    const data = await saveItem(entity, fieldsValue);
    // console.log('🚀 ~ file: Ledger/Create.tsx ~ line 29 ~ onSubmit ~ data: ', data);
    if (data.success === true) { 
      form.resetFields(); setFrmdate(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY')); vardate = frmdate; }
    // successHandler(data, { notifyOnSuccess: true, notifyOnFailed: true, });
  };
  return (
    <>
      <ERPLayout title="Sale New" frmwidth="60">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onSubmit} >          
          <FormItems handleJrdateChange={handleJrdateChange} />
          <Form.Item label='评分'><Rate defaultValue={5} /></Form.Item>
          <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
            <Space>
              <Button type='primary' htmlType='submit'>Submit</Button>
              <Button>Cancel</Button>
              <Button type="default" className="bg-green-500">Test Integration</Button>
            </Space>
          </Form.Item>
        </Form>
        
      </ERPLayout>
    </>
  );
}
