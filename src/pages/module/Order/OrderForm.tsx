import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import ItemRow from './ItemRow';

import MoneyInputFormItem from '@/components/UI/MoneyInputFormItem';

export default function OrderForm({ subTotal = 0, current = null }) {
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  const handelTaxChange = (value: number) => { setTaxRate(value);  };

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year } = current;
      setTaxRate(taxRate);
      setCurrentYear(year);
    }
  }, [current]);
  useEffect(() => {
    const currentTotal = subTotal * taxRate + subTotal;
    setTaxTotal(parseFloat((subTotal * taxRate).toFixed(2)));
    setTotal(parseFloat(currentTotal.toFixed(2)));
  }, [subTotal, taxRate]);
  
  // const addField = useRef<React.MutableRefObject<React.Ref<HTMLButtonElement>>>(null);
  const addField = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (null !== addField.current) {
      addField.current.click();
    }    
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={5}>
        <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input First Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
        <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input Last Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
        <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please input Email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Col>       
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={5}>
          <p>Item</p>
        </Col>        
        <Col className="gutter-row" span={3}>
          <p>Quantity</p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p>Price</p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p>Total</p>
        </Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<FiTrash2 />}
                ref={addField}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Sub Total :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={subTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <Form.Item
              name="taxRate"
              rules={[
                {
                  required: false,
                  message: 'Please input your taxRate!',
                },
              ]}
              initialValue="0"
            >
              <Select
                value={taxRate}
                onChange={handelTaxChange}
                bordered={false}
                options={[
                  { value: 0, label: 'Tax 0 %' },
                  { value: 0.19, label: 'Tax 19 %' },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={taxTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Total :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={total} />
          </Col>
        </Row>
      </div>
    </>
  );
}
