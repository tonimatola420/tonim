import React, { useState } from 'react';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import Link from "next/link";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { IoIosCreate, } from "react-icons/io";
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button, } from 'antd';

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

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <div className="demo-logo-vertical" /> */}
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        <div className="demo-logo-vertical">
          <img src='/images/logo-icon.png' alt="Logo" className='w-[16%] h-[16%]' />
          {!collapsed && (
            <img src='/images/logo-text.png' alt="Logo" style={{ marginTop: '-8px', marginLeft: '16px' }} />
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">          
          <Menu.Item key={'MnuClient'} icon={<IoIosCreate />}><Link href={`/module/Client/Read`} >Suppliers</Link></Menu.Item>
          <Menu.Item key={'SupplierCreate'} icon={<IoIosCreate />}><Link href={`/module/Client/Create`} >Supplier New</Link></Menu.Item>
          <Menu.Item key={'MnuSector'} icon={<IoIosCreate />}><Link href={`/module/Sector/Read`} >Sectors</Link></Menu.Item>
          <Menu.Item key={'SectorCreate'} icon={<IoIosCreate />}><Link href={`/module/Sector/Create`} >Sector New</Link></Menu.Item>
          <Menu.Item key={'MnuCustomer'} icon={<IoIosCreate />}><Link href={`/module/Customer/Read`} >Customers</Link></Menu.Item>
          <Menu.Item key={'CustomerCreate'} icon={<IoIosCreate />}><Link href={`/module/Customer/Create`} >Customer New</Link></Menu.Item>
          <Menu.Item key={'MnuSystem'} icon={<IoIosCreate />}><Link href={`/module/System/Read`} >Systems</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          <Button
            type="text"
            icon={collapsed ? <FiEdit /> : <FiEdit />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 24,
            }}
          />
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, color: 'black', }}>
            Bill is a cat.
            <div>Bill is a cat.</div>            
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;