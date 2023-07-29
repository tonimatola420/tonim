import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, FormListFieldData } from 'antd';
import { FiTrash2, FiEdit } from "react-icons/fi";

export default function ItemRow({ field, remove, current = null, }: { field: FormListFieldData, remove: (index: number | number[]) => void, current: any, }) {
  const [totalState, setTotal] = useState<number>();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const updateQt = (value: 0 | null) => { setQuantity(value!); };
  const updatePrice = (value: 0 | null) => { setPrice(value!); };

  useEffect(() => {
    if (current) {
      const { items } = current; const item = items[field.key];
      if (item) { setQuantity(item.quantity); setPrice(item.price); }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = price * quantity; setTotal(parseFloat(currentTotal.toFixed(2)));
  }, [price, quantity]);

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'product_title']}
          fieldKey={[field.key, 'product_title']}
          rules={[{ required: true, message: 'Missing itemName name' }]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item
          name={[field.name, 'quantity']}
          fieldKey={[field.key, 'quantity']}
          rules={[{ required: true, message: 'Missing item quantity' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={4}>
        <Form.Item
          name={[field.name, 'price']}
          fieldKey={[field.key, 'price']}
          rules={[{ required: true, message: 'Missing item price' }]}
        >
          <InputNumber className="moneyInput" onChange={updatePrice} min={0}
            controls={false} addonAfter={'₹'} addonBefore={undefined}            
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'total']}>
          <Form.Item>
            <InputNumber readOnly className="moneyInput" value={totalState} min={0}
              controls={false} addonAfter={'₹'} addonBefore={undefined}              
            />
          </Form.Item>
        </Form.Item>
      </Col>

      <div style={{ position: 'relative', right: '-20px', top: ' 5px' }}>
        <FiTrash2 onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
