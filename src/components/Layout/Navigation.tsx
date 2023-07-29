import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Link from "next/link";
import { Layout, Menu } from 'antd';

// import { useAppContext } from '@/context/appContext';
// import logoIcon from '/images/logo-icon.png';
// import logoText from '/images/logo-text.png';
// import {
//   // DesktopOutlined,
//   SettingOutlined,
//   CustomerServiceOutlined,
//   FileTextOutlined,
//   FileSyncOutlined,
//   DashboardOutlined,
//   TeamOutlined,
//   UserOutlined,
//   CreditCardOutlined,
//   // BankOutlined,
// } from '@ant-design/icons';

import { FiTrash2, FiEdit } from "react-icons/fi";
import { IoIosCreate, } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";
import { GrDashboard } from "react-icons/gr";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  // const { state: stateApp, appContextAction } = useAppContext();
  // const { isNavMenuClose } = stateApp;
  // const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(false);

  // useEffect(() => {
  //   if (isNavMenuClose) {
  //     setLogoApp(isNavMenuClose);
  //   }
  //   const timer = setTimeout(() => {
  //     if (!isNavMenuClose) {
  //       setLogoApp(isNavMenuClose);
  //     }
  //   }, 200);
  //   return () => clearTimeout(timer);
  // }, [isNavMenuClose]);
  const onCollapse = () => {
    // navMenu.collapse();
    setLogoApp(!showLogoApp);

  };

  return (
    // <div className="w-[20%]">
      <div>
      <Sider collapsible collapsed={showLogoApp} onCollapse={onCollapse} className="navigation" style={{ minHeight: '100vh' }}>
        <div className="logo">
          <img src='/images/logo-icon.png' alt="Logo" className='w-[16%] h-[16%]'
          // style={{ margin: "0 auto 40px", display: "block" }}
          />

          {!showLogoApp && (
            <img src='/images/logo-text.png' alt="Logo" style={{ marginTop: '-8px', marginLeft: '16px' }} />
          )}
        </div>
        <Menu mode="inline">
          {/* <Menu.Item key={'Dashboard'} icon={<AiOutlineDashboard />}><Link href={`/module/Ledger/Read`} >Dashboard</Link></Menu.Item>
          <Menu.Item key={'MnuLedgerCreate'} icon={<IoCreateOutline />}><Link href={`/module/Ledger/Create`} >Account New</Link></Menu.Item>
          <Menu.Item key={'MnuTransactions'} icon={<IoIosCreate />}><Link href={`/module/Journal/Read`} >Transactions</Link></Menu.Item>
          <Menu.Item key={'JournalCreate'} icon={<IoIosCreate />}><Link href={`/module/Journal/Create`} >Transaction New</Link></Menu.Item>
          <Menu.Item key={'MnuProductss'} icon={<IoIosCreate />}><Link href={`/module/Product/Read`} >Products</Link></Menu.Item>
          <Menu.Item key={'MnuSales'} icon={<IoIosCreate />}><Link href={`/module/Sale/Read`} >Sales</Link></Menu.Item>
          <Menu.Item key={'SaleCreate'} icon={<IoIosCreate />}><Link href={`/module/Sale/Create`} >Sale New</Link></Menu.Item> */}
          <Menu.Item key={'MnuClient'} icon={<IoIosCreate />}><Link href={`/module/Client/Read`} >Suppliers</Link></Menu.Item>
          <Menu.Item key={'SupplierCreate'} icon={<IoIosCreate />}><Link href={`/module/Client/Create`} >Supplier New</Link></Menu.Item>
          <Menu.Item key={'MnuSector'} icon={<IoIosCreate />}><Link href={`/module/Sector/Read`} >Sectors</Link></Menu.Item>
          <Menu.Item key={'SectorCreate'} icon={<IoIosCreate />}><Link href={`/module/Sector/Create`} >Sector New</Link></Menu.Item>
          <Menu.Item key={'MnuCustomer'} icon={<IoIosCreate />}><Link href={`/module/Customer/Read`} >Customers</Link></Menu.Item>
          <Menu.Item key={'CustomerCreate'} icon={<IoIosCreate />}><Link href={`/module/Customer/Create`} >Customer New</Link></Menu.Item>
          <Menu.Item key={'MnuSystem'} icon={<IoIosCreate />}><Link href={`/module/System/Read`} >Systems</Link></Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
