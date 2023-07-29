import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect, Upload,
  Slider, Rate, Typography, Space, Divider, Row, Col,
} from 'antd';
import dayjs from 'dayjs';
import { saveItem } from '@/utils/client/api/warehouseApis';
import successHandler from '@/utils/hooks/successHandler';
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from '@/stores/reducers/store';
import { selectDeleteState, selectListState, fetchList } from "@/stores/reducers/erpSlice";
import ERPLayout from '@/components/Layout/ERPLayout';
import LeftMenu from '@/components/Layout/LeftMenu';
import FormItems from './FormItems';
// import { config } from './config';
// import config from './config';
import { config } from '@/utils/client/configs/client.config';
const { Option } = Select;
const { Title } = Typography;

export default function Create() {
  const { entity, module, } = config; const dispatch = useAppDispatch();
  const [frmdate, setFrmdate] = useState(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
  const [form] = Form.useForm();
  const handleJrdateChange: ((value: dayjs.Dayjs | null, dateString: string) => void) = (value: dayjs.Dayjs | null, dateString: string): void => { setFrmdate(dateString); };
  // const onSubmit = async (fieldsValue: {}) => {
  //   // let newValues: {clms_addr?: string} = { ...fieldsValue };
  //   // console.log('05JULY2023-20:06->',newValues.clms_addr);
  //   // console.log('05JULY2023-20:06->',newValues['clms_addr']);
  //   const data = await saveItem(entity, fieldsValue);
  //   // console.log('🚀 ~ file: Ledger/Create.tsx ~ line 29 ~ onSubmit ~ data: ', data);
  //   if (data.success === true) { form.resetFields(); }
  //   // successHandler(data, { notifyOnSuccess: true, notifyOnFailed: true, });
  // };
  const onSubmit = async (fieldsValue: {}) => {
    const options = { page: '1', relations: JSON.stringify({ rake: { system: true, }, }), jsonData: JSON.stringify(fieldsValue) };
    dispatch(fetchList('rakeStatus', options));
  };
  return (
    <>
      <LeftMenu title={['SUPPLIER', 'CREATE']} frmwidth="140">
        {/* <ERPLayout title='123456' frmwidth="140"> */}
        {/* <Row gutter={10}>
        <Col md={12} xs={24}> */}
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} form={form} onFinish={onSubmit} style={{ backgroundColor: 'white', }} >
          <FormItems handleJrdateChange={handleJrdateChange} />
          <Form.Item label='评分'><Rate defaultValue={5} /></Form.Item>
          <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          {/* <Form.Item> */}
            <Space>
              <Button type='primary' htmlType='submit'>Submit</Button>
              <Button>Cancel</Button>
              <Button type="default" className="bg-green-500">Test Integration</Button>
            </Space>
          </Form.Item>
        </Form>
        {/* </Col>
      </Row> */}
      </LeftMenu>
      {/* </ERPLayout> */}
    </>
  );
}
