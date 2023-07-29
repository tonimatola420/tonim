import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import { Layout } from 'antd';
import { selectDeleteState, selectListState, selectUpdateState, resetAction, editItem } from "@/stores/reducers/erpSlice";
import { useAppDispatch } from '@/stores/reducers/store';
import { useRouter } from "next/router";
import LedgerForm from './LedgerForm';
// import { config } from './config';
import { config } from '@/utils/client/configs/ledger.config';
import ERPLayout from '@/components/Layout/ERPLayout';
const { Content } = Layout;

export default function UpdateForm() {
  let dtpjrdate; const router = useRouter();
  const [dtjrdate, setDtjrdate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
  const { entity, module, } = config;
  const dispatch = useAppDispatch(); const [form] = Form.useForm();
  const { current, isLoading, isSuccess } = useSelector(selectUpdateState);
  const [currentObj, setCurrentObj] = useState(current);

  const cancelEdit = () => {
    form.resetFields(); setCurrentObj(null); dispatch(resetAction({ keyState: 'update' }));
    router.push(`/module/${module}/Read`);
  };

  const onSubmit = (fieldsValue: any) => {
    // console.log('🚀 ~ file: index.jsx ~ line 34 ~ onSubmit ~  current.id', currentObj.id);
    const id = currentObj.id; dispatch(editItem(entity, id, fieldsValue));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields(); setCurrentObj(null);
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
      // console.log('🚀 ~ file: index.jsx ~ line 40 ~ useEffect ~ obj', newValues);
      form.setFieldsValue(newValues);
    }
  }, [current]);

  return (
    <ERPLayout title="Account Edit" frmwidth="100">
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <LedgerForm />
          <Form.Item style={{ display: 'inline-block', paddingRight: '5px', }} >
            <Button type="primary" htmlType="submit">Update {module}</Button>
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', paddingLeft: '5px', }} >
            <Button onClick={cancelEdit}>Cancel</Button>
          </Form.Item>
        </Form>
      </Loading>
    </ERPLayout>
  );
}
