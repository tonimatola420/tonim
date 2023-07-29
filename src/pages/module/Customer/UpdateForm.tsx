import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import { Layout } from 'antd';
import { selectDeleteState, selectListState, selectUpdateState, resetAction, editItem } from "@/stores/reducers/erpSlice";
import { useAppDispatch } from '@/stores/reducers/store';
import { useRouter } from "next/router";
import FormItems from './FormItems';
// import { config } from './config';
import { config } from '@/utils/client/configs/customer.config';
import ERPLayout from '@/components/Layout/ERPLayout';
import LeftMenu from '@/components/Layout/LeftMenu';
const { Content } = Layout;

export default function UpdateForm() {
  let vardate; const router = useRouter();
  const [frmdate, setFrmdate] = useState(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
  // const [frmdate, setFrmdate] = useState<string>();
  const { entity, module, } = config;
  const dispatch = useAppDispatch(); const [form] = Form.useForm();
  const { current, isLoading, isSuccess } = useSelector(selectUpdateState);
  const [currentObj, setCurrentObj] = useState(current);
  const handleJrdateChange = (value: dayjs.Dayjs | null, dateString: string): void => {
    setFrmdate(dayjs(value).subtract(0, 'days').format('DD-MM-YYYY'));
  };
  const cancelEdit = () => {
    form.resetFields(); setCurrentObj(null); dispatch(resetAction({ keyState: 'update' }));
    router.push(`/module/${module}/Read`);
  };

  const onSubmit = (fieldsValue: any) => {
    // const { date, particular } = fieldsValue;
    // let year = frmdate.slice(6, 10); let month = frmdate.slice(3, 5); let date1 = frmdate.slice(0, 2);
    // vardate = dayjs(year + month + date1).format('YYYY-MM-DD');
    // fieldsValue = { date: vardate, particular };
    // console.log('🚀 ~ file: index.jsx ~ line 34 ~ onSubmit ~  current.id', currentObj.id);
    const id = currentObj.id; dispatch(editItem(entity, id, fieldsValue));
    // console.log(frmdate);
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields(); setCurrentObj(null); setFrmdate(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY')); vardate = frmdate;
      dispatch(resetAction({ actionType: 'update' })); router.push(`/module/${module}/Read`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (current) {
      setCurrentObj(current);
      let newValues = { ...current };
      if (newValues.birthday) { newValues = { ...newValues, birthday: dayjs(newValues['birthday']), }; }
      if (newValues.date) { newValues = { ...newValues, date: dayjs(newValues['date']), }; }
      if (newValues.expiredDate) { newValues = { ...newValues, expiredDate: dayjs(newValues['expiredDate']), }; }
      if (newValues.created) { newValues = { ...newValues, created: dayjs(newValues['created']), }; }
      if (newValues.updated) { newValues = { ...newValues, updated: dayjs(newValues['updated']), }; }
      if (newValues.date) { setFrmdate(dayjs(newValues['date'].$d).subtract(0, 'days').format('DD-MM-YYYY')); }
      form.setFieldsValue(newValues);
    }
  }, [current]);

  return (
    <LeftMenu title={['CUSTOMER', 'UPDATE']} frmwidth="140">
    {/* <ERPLayout title='123456' frmwidth="140"> */}
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <FormItems handleJrdateChange={handleJrdateChange} />
          <Form.Item style={{ display: 'inline-block', paddingRight: '5px', }} >
            <Button type="primary" htmlType="submit">Update {module}</Button>
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', paddingLeft: '5px', }} >
            <Button onClick={cancelEdit}>Cancel</Button>
          </Form.Item>
        </Form>
      </Loading>
    </LeftMenu>
    // </ERPLayout>
  );
}
