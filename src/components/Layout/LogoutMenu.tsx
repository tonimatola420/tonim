import React from 'react';
import { useDispatch } from 'react-redux';
import Link from "next/link";
import { Avatar, Menu, Dropdown } from 'antd';
import { useRouter } from "next/router";

import { AiOutlineLoading3Quarters, AiOutlineLoading } from "react-icons/ai";
import { FiCommand } from "react-icons/fi";
import { ImSpinner, ImSpinner2, ImSpinner3, ImSpinner4, ImSpinner9, ImSpinner10, } from "react-icons/im";
import { CgSpinner, CgSpinnerTwo, CgSpinnerTwoAlt, } from "react-icons/cg";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { IoIosCreate, } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";
import { GrDashboard } from "react-icons/gr";
import photo from '@/style/images/photo.png';

// import { logout } from '@/redux/auth/actions';
import { uniqueId } from '@/utils/client/utils';


export default function HeaderContent() {
  // const dispatch = useDispatch();
  const { SubMenu } = Menu;
  const router = useRouter();
  const profileDropdown = (
    <div className="profileDropdown whiteBox shadow" style={{ minWidth: '200px' }}>
      <div className="pad15">
        <Avatar size="large" className="last" src='/images/photo.png' style={{ float: 'left' }} />
        <div className="info">
          <p className="strong">Somak Paul</p>
          <p>mail2somakpal@gmail.com</p>
        </div>
      </div>
      <div className="line"></div>
      <div>
        <Menu>  
          <SubMenu key="sub1" icon={<FiEdit />} title="Navigation One">
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key={'Dashboard'} icon={<GrDashboard />}>
                <Link href={`/module/Ledger/Read`} >Dashboard</Link>
              </Menu.Item>
              <Menu.Item key={'LedgerCreate'} icon={<AiFillDashboard />}>
                <Link href={`/module/Ledger/Create`} >Account New</Link>
              </Menu.Item>
              <Menu.Item key={'Transactions'} icon={<IoCreateOutline />}>
                <Link href={`/module/Journal/Read`} >Transactions</Link>
              </Menu.Item>
              <Menu.Item key={'TransactionCreate'} icon={<ImSpinner10 />}>
                <Link href={`/module/Journal/Create`} >Transaction New</Link>
              </Menu.Item>
              <Menu.Item key={'OrderCreate'} icon={<CgSpinnerTwo />}>
                <Link href={`/module/Order/CreateItem`} >Order New</Link>
              </Menu.Item>
              <Menu.Item key={'OrderRead'} icon={<IoIosCreate />}>
                <Link href={`/module/Order/OrderDataTable`} >Order List</Link>
              </Menu.Item>
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu key="sub2" icon={<ImSpinner2 />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<AiOutlineLoading3Quarters />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div className="line"></div>
      <div>
        <Menu>
          <Menu.Item
            icon={<FiCommand />}
            key={`${uniqueId()}`}
            onClick={() => router.push(`/module/Ledger/Create`)}
          >
            logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <div className="headerIcon" style={{ position: 'absolute', right: 0, zIndex: '99' }}>
      <Dropdown overlay={profileDropdown} trigger={['click']} placement="bottomRight">
        {/* <Badge dot> */}
        <Avatar className="last" src='/images/photo.png' />
        {/* </Badge> */}
      </Dropdown>

      <Avatar icon={<AiOutlineDashboard />} />

      <Avatar icon={<ImSpinner4 />} />
    </div>
  );
}
