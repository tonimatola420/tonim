import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { valueByString } from '@/utils/client/helpers';
import { selectDeleteState, deleteItem, } from "@/stores/reducers/erpSlice";
import { getSearchedItems, } from '@/utils/client/api/ledgerApis';
import { useAppDispatch } from '@/stores/reducers/store';
// import { config } from './config';
import { config } from '@/utils/client/configs/sale.config';

export default function Delete({ rowId, isVisible, setIsVisible }: { rowId: string, isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  let { entity, displayLabels, deleteMessage, modalTitle, } = config;
  const dispatch = useAppDispatch();
  const deleteState = useSelector(selectDeleteState);
  const { result, current, isLoading, isSuccess, } = deleteState;
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) { setIsVisible(false); }
    if (current) {
      let labels = displayLabels.map((x: string) => valueByString(current, x)).join(' ');
      setDisplayItem(labels + ' ?');
    }
  }, [isSuccess, current]);

  const handleOk = () => { dispatch(deleteItem(entity, rowId)); };

  const handleCancel = () => { if (!isLoading) setIsVisible(false); };

  return (
    <Modal
      title={modalTitle} visible={isVisible} onOk={handleOk}
      onCancel={handleCancel} confirmLoading={isLoading}
    >
      <p>  {deleteMessage}  {displayItem}  </p>
    </Modal>
  );
}
