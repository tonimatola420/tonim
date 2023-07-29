import React from 'react';
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from '@/utils/client/utils';
import DataTable from './DataTable';
import { Layout } from 'antd';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { currentAction, fetchList, deleteItem, fetchById, } from "@/stores/reducers/erpSlice";
import Delete from './DeleteItem';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/grn.config';
import ERPLayout from '@/components/Layout/ERPLayout';
import LeftMenu from '@/components/Layout/LeftMenu';
import HeaderContent from '@/components/Layout/LogoutMenu';
const { Content } = Layout;
let dbentity = '';

export default function DataTableDropMenu() {
  const router = useRouter(); const { entity, module, HEADER_SECTION, } = config; dbentity = entity;
  const [isVisible, setIsVisible] = useState(false); const [rowId, setRowId] = useState<string>('');

  function AddNewItem() {
    const { ADD_NEW_ENTITY } = config;
    const handelClick = () => { router.push(`/${dbentity}/create`); };
    return (<Button onClick={handelClick} type="primary">ADD_NEW</Button>);
  }

  function DropDownRowMenu({ row }: any) {
    const dispatch = useAppDispatch();

    function Edit() {
      // const options = { page: 1, relations: JSON.stringify({ client: true, grn_items: { product: true }, }), jsonData: '{}' };        
      // dispatch(fetchList(entity, options));
      // dispatch(currentAction({ keyState: 'update', id: row.id }));   conditions: JSON.stringify({ id: row.id, }),
      const options = { conditions: JSON.stringify({ id: row.id, }), relations: JSON.stringify({ client: true, grn_items: { product: true, rake: { system: true, } }, }), jsonData: '{}' };
      dispatch(fetchById(entity, options));
      router.push(`/module/${module}/UpdateItem`);
    }
    function Delete() {
      setRowId(row.id); dispatch(currentAction({ keyState: 'delete', id: row.id }));
      setIsVisible(true);
    }
    return (
      <Menu style={{ minWidth: 130 }}>
        <Menu.Item key={`${uniqueId()}`} icon={<FiEdit />} onClick={Edit}> Edit </Menu.Item>
        <Menu.Item key={`${uniqueId()}`} icon={<FiTrash2 />} onClick={Delete}>Delete</Menu.Item>
      </Menu>
    );
  }

  return (
    <>
      <LeftMenu title={['GRN', 'LIST']} frmwidth="140">
        <DataTable DropDownRowMenu={DropDownRowMenu} AddNewItem={AddNewItem} />
        <Delete rowId={rowId} isVisible={isVisible} setIsVisible={setIsVisible} />
      </LeftMenu>
    </>
  );
}
