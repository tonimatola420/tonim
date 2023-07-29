import { Typography, Space, Divider, } from 'antd';
import dayjs from 'dayjs';
import HeaderContent from '@/components/Layout/LogoutMenu';
const { Title } = Typography;

interface IConfig {
  [key: string]: any;
}

const renderContent = (value: any, row: any, index: any) => {
  const obj: { children: any, props: any, } = { children: value, props: {}, };
  if (index === 4) { obj.props.colSpan = 0; }
  return obj;
};

export const config: IConfig = {
  entity: 'order',
  relations: '',
  dataTableTitle: 'Orders:',
  module: 'Order',
  dataTableColumns: [
    { title: '#N', dataIndex: 'id', },
    {
      title: 'Name',
      dataIndex: ['name'],
      colSpan: 2,
      render: renderContent,
    },
    {
      title: 'Email',
      dataIndex: ['email'],
      colSpan: 0,      
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (date: Date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
  ],
  displayLabels: ['name', 'email'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',
  ADD_NEW_ENTITY: 'ADD ORDER',
};

