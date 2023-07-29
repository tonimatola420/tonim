import React, { useState, useEffect } from 'react';
import { Form, Divider, Space, FormInstance } from 'antd';
import dayjs from 'dayjs';
import { Button, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '@/stores/reducers/store';
import { uniqueId } from '@/utils/client/utils';
import Loading from '@/components/Loading';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { selectDeleteState, selectListState, selectUpdateState, resetAction, editItem } from "@/stores/reducers/erpSlice";
// import { config } from './config';
import { config } from '@/utils/client/configs/order.config';
import OrderForm from './OrderForm';
import ERPLayout from '@/components/Layout/ERPLayout';
import { Layout } from 'antd';
const { Content } = Layout;

function SaveForm({ form }: { form: FormInstance }) {
  const handelClick = () => { form.submit(); };
  return (
    <Button onClick={handelClick} type="primary" icon={<FiEdit />}>UPDATE ORDER</Button>
  );
}

export default function UpdateItem() {
  let { entity, id } = config; const dispatch = useAppDispatch(); const [form] = Form.useForm();
  let { current, isLoading, isSuccess } = useSelector(selectUpdateState);
  const [subTotal, setSubTotal] = useState(0); const [currentObj, setCurrentObj] = useState(current);

  const handelValuesChange = (changedValues: any, values: any) => {
    const items = values['items'];
    let subTotal = 0;

    if (items) {
      items.map((item: any) => {
        if (item) {
          if (item.quantity && item.price) {
            let total = item['quantity'] * item['price'];
            subTotal += total;
          }
        }
      });
      setSubTotal(subTotal);
    }
  };

  const onSubmit = (fieldsValue: any) => {
    if (fieldsValue) {
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        newList.map((item) => { item.total = item.quantity * item.price; });
        fieldsValue = { ...fieldsValue, items: newList, };
      }
    }
    const id = currentObj.id; dispatch(editItem(entity, id, fieldsValue));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields(); setSubTotal(0);
      dispatch(resetAction({ keyState: 'update' }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      setCurrentObj(current);
      // if (current.client) {
      //   const tmpValue = { ...current.client };
      //   setAutoCompleteValue(tmpValue);
      //   current.client = undefined;
      // }
      if (current.date) { current.date = dayjs(current.date); }
      if (current.expiredDate) { current.expiredDate = dayjs(current.expiredDate); }
      if (!current.taxRate) {
        current = { ...current, taxRate: 0,};
        // current.taxRate = 0; 
      }
      const { subTotal } = current; form.setFieldsValue(current); setSubTotal(subTotal);
      console.log('doribaba2: ', JSON.stringify(current));
    }
  }, [current]);

  return (
    <ERPLayout title="Transaction New" frmwidth="140">
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <OrderForm subTotal={subTotal} current={current} />
          <SaveForm form={form} key={`${uniqueId()}`} />
        </Form>
      </Loading>
    </ERPLayout>
  );
}
