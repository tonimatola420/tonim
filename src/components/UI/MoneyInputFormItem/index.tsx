import { Form, InputNumber } from 'antd';

export default function MoneyInputFormItem({ updatePrice, value = 0, readOnly = false }
  : { updatePrice?: ((value: number | null) => void), value: number, readOnly: boolean }) {
  
  return (
    <Form.Item>
      <InputNumber
        readOnly={readOnly}
        className="moneyInput"
        onChange={updatePrice}
        value={value}
        controls={false} addonAfter={'₹'} addonBefore={undefined}
      />
    </Form.Item>
  );
}
