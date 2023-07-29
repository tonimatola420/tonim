import React, { useState, useEffect } from 'react';
import { Form, Divider, FormInstance } from 'antd';
import { Button, Statistic, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from '@/utils/client/utils';
import Loading from '@/components/Loading';
import OrderForm from './OrderForm';
import { FiTrash2, FiEdit } from "react-icons/fi";
// import { config } from './config';
import { config } from '@/utils/client/configs/order.config';
import { selectDeleteState, selectListState, selectUpdateState, resetAction, editItem, selectCreateState } from "@/stores/reducers/erpSlice";
import { useAppDispatch } from '@/stores/reducers/store';
import { useRouter } from "next/router";
import ERPLayout from '@/components/Layout/ERPLayout';
import { saveItem } from '@/utils/client/api/ledgerApis';
import { Layout } from 'antd';
const { Content } = Layout;
export type BaseFormInstance = FormInstance;

function SaveForm({ form }: { form: FormInstance }) {
  const handelClick = () => {
    form.submit();
  };
  return (
    <Button onClick={handelClick} type="primary" icon={<FiEdit />}>
      CREATE ORDER
    </Button>
  );
}

export default function CreateItem() {
  let { entity, CREATE_ENTITY } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreateState);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const handelValuesChange = (changedValues: any, values: any) => {
    const items = values['items'];
    let subTotal = 0;

    if (items) {
      items.map((item: any) => {
        if (item) {
          if (item.quantity && item.price) {
            let total = item['quantity'] * item['price'];
            //sub total
            subTotal += total;
          }
        }
      });
      setSubTotal(subTotal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(resetAction({ actionType: 'create' }));
      setSubTotal(0);
    }
  }, [isSuccess]);

  const onSubmit = async (fieldsValue: any) => {
    if (fieldsValue) {
      // if (fieldsValue.expiredDate) {
      //   const newDate = fieldsValue["expiredDate"].format("DD/MM/YYYY");
      //   fieldsValue = {
      //     ...fieldsValue,
      //     expiredDate: newDate,
      //   };
      // }
      // if (fieldsValue.date) {
      //   const newDate = fieldsValue["date"].format("DD/MM/YYYY");
      //   fieldsValue = {
      //     ...fieldsValue,
      //     date: newDate,
      //   };
      // }
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        newList.map((item) => { item.total = item.quantity * item.price; });
        fieldsValue = { ...fieldsValue, order_items: newList, };
      }
    }
    const data = await saveItem(entity, fieldsValue);
  };

  return (
    <ERPLayout title="Transaction New" frmwidth="140">
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <OrderForm subTotal={subTotal} />
          <SaveForm form={form} key={`${uniqueId()}`} />
        </Form>
      </Loading>
    </ERPLayout>
  );
}
