'use client';

import {
	Button,
	Cascader,
	Checkbox,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Switch,
	TreeSelect,
	Upload,	
  Slider,  
  Rate,
  Typography,
  Space,
  Divider,
} from 'antd';

// import Icons from './Icons';

const { Option } = Select;
const { Title } = Typography;

export default function FormComponent() {
	return (

		<>
      <section style={{ textAlign: 'center', marginTop: 48, marginBottom: 40 }}>
        <Space align='start'>
          <img
            style={{ width: 40, height: 40 }}
            src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
            alt='Ant Design'
          />
          <Title level={2} style={{ marginBottom: 0 }}>
            Ant Design
          </Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 60 }}>Form</Divider>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Form.Item label='数字输入框'>
          <InputNumber min={1} max={10} defaultValue={3} />
          <span className='ant-form-text'> 台机器</span>
          <a href='https://ant.design'>链接文字</a>
        </Form.Item>
        <Form.Item label='开关'>
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item label='滑动输入条'>
          <Slider defaultValue={70} />
        </Form.Item>
        <Form.Item label='选择器'>
          <Select defaultValue='lucy' style={{ width: 192 }}>
            <Option value='jack'>jack</Option>
            <Option value='lucy'>lucy</Option>
            <Option value='disabled' disabled>
              disabled
            </Option>
            <Option value='yiminghe'>yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item label='日期选择框'>
          <DatePicker />
        </Form.Item>
        <Form.Item label='日期范围选择框'>
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label='评分'>
          <Rate defaultValue={5} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button>Cancel</Button>
			<Button type="default" className="bg-green-500">Test Integration</Button>
          </Space>
        </Form.Item>
      </Form>








	  <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
			<Form.Item label="Checkbox" name="disabled" valuePropName="checked">
				<Checkbox>Checkbox</Checkbox>
			</Form.Item>
			<Form.Item label="Radio">
				<Radio.Group>
					<Radio value="apple"> Apple </Radio>
					<Radio value="pear"> Pear </Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item label="Input">
				<Input />
			</Form.Item>
			<Form.Item label="Select">
				<Select>
					<Select.Option value="demo">Demo</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item label="TreeSelect">
				<TreeSelect
					treeData={[
						{
							title: 'Light',
							value: 'light',
							children: [{ title: 'Bamboo', value: 'bamboo' }],
						},
					]}
				/>
			</Form.Item>
			<Form.Item label="Cascader">
				<Cascader
					options={[
						{
							value: 'zhejiang',
							label: 'Zhejiang',
							children: [
								{
									value: 'hangzhou',
									label: 'Hangzhou',
								},
							],
						},
					]}
				/>
			</Form.Item>
			<Form.Item label="DatePicker">
				<DatePicker />
			</Form.Item>
			<Form.Item label="RangePicker">
				<DatePicker.RangePicker />
			</Form.Item>
			<Form.Item label="InputNumber">
				<InputNumber />
			</Form.Item>
			<Form.Item label="TextArea">
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item label="Switch" valuePropName="checked">
				<Switch />
			</Form.Item>
			<Form.Item label="Upload" valuePropName="fileList">
				<Upload action="/upload.do" listType="picture-card">
					<div>
						{/* <Icons.Plus className="m-auto" /> */}
						<div className="mt-2">Upload</div>
					</div>
				</Upload>
			</Form.Item>
			<Form.Item label="Button">
				<Button type='primary'>Button</Button>
			</Form.Item>
		</Form>








    </>








		
	);
}
