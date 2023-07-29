import { Typography, Space, Divider, } from 'antd';
import HeaderContent from '@/components/Layout/LogoutMenu';
const { Title } = Typography;

interface IConfig {
  [key: string]: any;
}

export const config: IConfig = {
  entity: 'ledger',
  relations: '',
  dataTableTitle: 'Ledgers:',
  module: 'Ledger',
  dataTableColumns: [
    { title: 'Code', dataIndex: 'code' },
    { title: 'Ledger', dataIndex: 'name' },
    { title: 'Debit', dataIndex: 'debitTotal' },
    { title: 'Credit', dataIndex: 'creditTotal' },    
  ],
  displayLabels: ['name'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',
  ADD_NEW_ENTITY: 'ADD LEDGER',  

};


