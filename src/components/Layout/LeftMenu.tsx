import React, { ReactNode, useState } from 'react';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill, BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button, } from 'antd';
import LeftMnuItems from './LeftMnuItems';
import { start } from 'repl';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <FiEdit />),
  getItem('Option 2', '2', <FiEdit />),
  getItem('User', 'sub1', <FiEdit />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <FiEdit />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FiEdit />),
];

// const ProductDetails: React.FC<{ product: IProductObject }> = ({ product }) => {
interface ILayoutProps { children?: ReactNode, title?: string[], frmwidth?: string, }
// const ERPLayout = ({ children, title, frmwidth }: ILayoutProps) => {
// const App: React.FC = () => {
const App: React.FC<ILayoutProps> = ({ children, title, frmwidth }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        <LeftMnuItems collapsed={collapsed} />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Button
              type="text"
              icon={collapsed ? <BsFillSkipForwardFill /> : <BsFillSkipBackwardFill />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 24,
              }}
            />
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            {title!.map((item, i) => (
              <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>              
            ))}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, color: 'black', justifyContent: 'start' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Enterprise ERP ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default App;