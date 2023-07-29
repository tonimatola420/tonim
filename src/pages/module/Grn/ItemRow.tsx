import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, FormListFieldData, Select, Typography } from 'antd';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { RiVolumeUpLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import DPdown from './DPdown';
import useOnFetch from '@/utils/hooks/useOnFetch';
const { Option } = Select;

export default function ItemRow({ field, remove, current = null, }: { field: FormListFieldData, remove: (index: number | number[]) => void, current: any, }) {
  const [totalState, setTotal] = useState<number>(0);
  const [price, setPrice] = useState(0);
  const [comboVal, setComboVal] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [rake, setRake] = useState([]);
  // const [rowfield, setRowfield] = useState(field);
  const [dpcond, setDpcond] = useState({});
  // interface IOptions { [key: number]: any; }
  const [systemid, setSystemid] = useState('2');
  // const handleSelectOnChange: ((value: any, key: any) => void) = (value:any, key: any): void => { setSystemid([[key][value]]); };
  const handleSelectOnChange: ((value: any, key: any) => void) = (value:any, key: any): void => { 
    // setSystemid({...systemid, [key]: value}); 
    // systemid[key]=value;
    setSystemid(value);
  };
  const [isHover, setIsHover] = useState(false);
   const handleMouseEnter = () => {setIsHover(true);};
   const handleMouseLeave = () => {setIsHover(false);};
   const boxStyle = {    
    cursor: 'pointer',
    // backgroundColor: isHover ? 'lightblue' : 'rgb(0, 191, 255)',
    color: isHover ? 'red' : 'green',
 };

  //  const boxStyle = {
  //     height: '200px',
  //     width: '200px',
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     fontSize: '30px',
  //     cursor: 'pointer',
  //     backgroundColor: isHover ? 'lightblue' : 'rgb(0, 191, 255)',
  //     color: isHover ? 'red' : 'green',
  //  };

  const updateQt = (value: 0 | null) => { setQuantity(value!); };
  const updatePrice = (value: 0 | null) => { setPrice(value!); };

  // useEffect(() => {
  //   if (current) {
  //     const { grn_items } = current;
  //     // console.log('dorbase1......', JSON.stringify(grn_items));
  //     const item = grn_items[field.key];
  //     // if (item) { setQuantity(item.quantity); setPrice(item.price); }
  //   }
  // }, [current]);

  // useEffect(() => {
  //   setRowfield(field);
  // }, [field]);

  // useEffect(() => {
  //   console.log('daricomma', JSON.stringify(systemid));
  // }, [systemid]);

  function onChange(value: any) {
    setComboVal(value);
    // console.log(`selected ${value}`);
  }

  return (
    // <Row gutter={[12, 12]} style={{ position: 'relative' }}>
    <Row gutter={[10, 0]} key={field.key} align="middle">
      <Col xs={12} md={6}>
        <Form.Item name={[field.name, 'product']} rules={[{ required: true, message: 'Please Select Product!' }]} >
          <AutoCompleteAsync entity={'product'} displayLabels={['prms_prdcd', 'prms_name']} searchFields={'prms_prdcd,prms_name'} />
        </Form.Item>
      </Col>
      <Col md={4}>
        <Form.Item name={[field.name, 'rake', 'system']} rules={[{ required: true, message: 'Please Select System!' }]} >
          {/* <AutoCompleteAsync entity={'system'} displayLabels={['syms_name',]} searchFields={'syms_name'} /> */}
          <DPdown entity={'system'} displayLabels={['syms_name']} options={{}} handleSelectOnChange={handleSelectOnChange} rowkey={field.key} />
          {/* <Select
            showSearch
            value={comboVal}
            onChange={onChange}
            style={{ width: 200 }}
            placeholder="--Please Select--"
            optionFilterProp="children"
            filterOption={(input, option) => option!.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option!.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {person.map(p => <Option value={p.username}>{p.displayName}</Option>)}
          </Select> */}
        </Form.Item>
      </Col>
      <Col xs={12} md={4}>
        <Form.Item name={[field.name, 'rake']} rules={[{ required: true, message: 'Please Select Rake!' }]} >
          <DPdown entity={'rake'} displayLabels={['rams_code']} options={{conditions: JSON.stringify({system: { id: parseInt(systemid), }})}} />
          {/* <AutoCompleteAsync entity={'rake'} displayLabels={['rams_code']} searchFields={'rams_code'} /> */}
          {/* <Select
            showSearch
            value={comboVal}
            onChange={onChange}
            style={{ width: 200 }}
            placeholder="--Please Select--"
            optionFilterProp="children"
            filterOption={(input, option) => option!.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option!.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {person.map(p => <Option value={p.username}>{p.displayName}</Option>)}
          </Select> */}
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'quantity']}
          rules={[{ required: true, message: 'Missing item quantity' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
        </Form.Item>
      </Col>
      <Col xs={2}>
        {/* <Typography.Title
          level={2}
          onClick={() => remove(field.name)}
          style={{
            cursor: 'pointer',
            fontSize: '16px',
              width: 64,
              height: 24,
          }}
        >
          X
        </Typography.Title> */}
        {/* <FiTrash2 onClick={() => remove(field.name)} style={{cursor: 'pointer',display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',}}/> */}
        {/* <FiTrash2 onClick={() => remove(field.name)} style={{cursor: 'pointer', verticalAlign: 'top',}}/> */}
        <div
            style={boxStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            <FiTrash2 onClick={() => remove(field.name)} style={{cursor: 'pointer', verticalAlign: 'top',}}/>
         </div>
      </Col>

      {/* <div style={{ position: 'relative', right: '-20px', top: ' 5px' }}>
        <FiTrash2 onClick={() => remove(field.name)} />
      </div> */}

    </Row>
  );
}
