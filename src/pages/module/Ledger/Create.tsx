import {
  Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect, Upload,
  Slider, Rate, Typography, Space, Divider,
} from 'antd';
import { saveItem } from '@/utils/client/api/ledgerApis';
import successHandler from '@/utils/hooks/successHandler';
import { useDispatch, useSelector } from "react-redux";
import { } from "@/stores/reducers/erpSlice";
import ERPLayout from '@/components/Layout/ERPLayout';
import LedgerForm from './LedgerForm';
// import { config } from './config';
import { config } from '@/utils/client/configs/ledger.config';
const { Option } = Select;
const { Title } = Typography;

export default function Create() {
  const { entity, module, } = config;
  const [form] = Form.useForm();
  const onSubmit = async (fieldsValue: {}) => {
    const data = await saveItem(entity, fieldsValue);
    console.log('🚀 ~ file: Ledger/Create.tsx ~ line 29 ~ onSubmit ~ data: ', data);
    if (data.success === true) { form.resetFields(); }
    // successHandler(data, { notifyOnSuccess: true, notifyOnFailed: true, });
  };
  return (
    <>
      <ERPLayout title="Account New" frmwidth="140">
      
        
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onSubmit} >
          <LedgerForm />
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
