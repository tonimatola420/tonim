import { Typography, Space, Divider, } from 'antd';
import dayjs from 'dayjs';
import HeaderContent from '@/components/Layout/LogoutMenu';
const { Title } = Typography;

interface IConfig {
  [key: string]: any;
}

export const config: IConfig = {
  entity: 'journal',
  relations: 'ledger',
  dataTableTitle: 'Journals:',
  module: 'Journal',
  dataTableColumns: [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date: Date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    { title: "Code", dataIndex: ['ledger', 'code'] },
    { title: "Ledger", dataIndex: ['ledger', 'name'] },
    { title: 'Cr/Dr', dataIndex: 'jrtype' },
    { title: 'Amount', dataIndex: 'amount' },
  ],
  displayLabels: ['date', 'ledger.name', 'jrtype', 'amount'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',
  ADD_NEW_ENTITY: 'ADD JOURNAL',
  

};


