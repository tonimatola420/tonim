
import React from 'react';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
import { Select } from 'antd';
const { Option } = Select;

function onChange(value: any) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val: any) {
  console.log('search:', val);
}

const person = [{
  username: 'jstuart123',
  displayName: 'John Stuart'
},
{
  username: 'somak123',
  displayName: 'Somak Paul'
},
{
  username: 'amit123',
  displayName: 'Amit Das'
},
]


  


const Index: NextPage = () => {
  return (
    <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>  option!.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option!.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {person.map(p => <Option value={p.username}>{p.displayName}</Option>)}
  </Select>
    
  );
}

export default Index;
          