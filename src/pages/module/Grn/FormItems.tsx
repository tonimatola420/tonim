import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { RiVolumeUpLine } from "react-icons/ri";
import { BsClipboardPlus } from "react-icons/bs";
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import DPdown from './DPdown';
import ItemRow from './ItemRow';
import MoneyInputFormItem from '@/components/UI/MoneyInputFormItem';

export default function FormItems({ maxAmount = undefined, handleJrdateChange = undefined, subTotal = 0, current = null }:
  {
    maxAmount?: number | undefined, handleJrdateChange: ((value: dayjs.Dayjs | null, dateString: string) => void) | undefined,
    subTotal?: number | undefined, current?: any
  }) {
  // ((value: Dayjs | null, dateString: string) => void)
  const { TextArea } = Input;
    let count = 0;
  // export default function FormItems({ subTotal = 0, current = null }) {
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  const handelTaxChange = (value: number) => { setTaxRate(value); };

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
    if (null !== addField.current && count < 1 ) {
      addField.current.click();
      count++;
    }
  }, [addField]);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={5}>
          <Form.Item name="grhd_grndt" label="Date" initialValue={dayjs().add(0, 'days')} >
            <DatePicker onChange={handleJrdateChange} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}><Form.Item name="grhd_grnno" label="Grn No" ><Input /></Form.Item></Col>
        <Col className="gutter-row" span={5}><Form.Item name="grhd_inv_no" label="Inv No" ><Input /></Form.Item></Col>
        <Col className="gutter-row" span={5}><Form.Item name="grhd_veh_no" label="Veh No" ><Input /></Form.Item></Col>
        <Col className="gutter-row" span={5}>
          <Form.Item name="client" label="Client" rules={[{ required: true, message: 'Please Select Client!' }]} >
            <AutoCompleteAsync entity={'client'} displayLabels={['clms_code', 'clms_name']} searchFields={'clms_code,clms_name'} />
            {/* <DPdown entity={'client'} displayLabels={['clms_code', 'clms_name']} options={{}} outputValue ={'clms_code'} /> */}
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      {/* <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={5}><p>Product</p></Col>
        <Col className="gutter-row" span={3}><p>System</p></Col>
        <Col className="gutter-row" span={4}><p>Rake</p></Col>
        <Col className="gutter-row" span={5}><p>QTY</p></Col>
      </Row> */}
      <Row gutter={10} align="middle">
        <Col xs={12} md={6}><p>Product</p></Col>
        <Col md={4}><p>System</p></Col>
        <Col md={4}><p>Rake</p></Col>
        <Col className="gutter-row" span={5}><p>QTY</p></Col>
      </Row>
      <Form.List name="grn_items">
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
                icon={<BsClipboardPlus />}
                ref={addField}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      {/* <div style={{ position: 'relative', width: ' 100%', float: 'right' }}> */}
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
      
    </>
  );
}
