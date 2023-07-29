import { Typography, Space, Divider, } from 'antd';
import dayjs from 'dayjs';
import HeaderContent from '@/components/Layout/LogoutMenu';
const { Title } = Typography;

interface IConfig { [key: string]: any; }

export const config: IConfig = {
  entity: 'sale',
  relations: 'product',
  dataTableTitle: 'Sales:',
  module: 'Sale',
  dataTableColumns: [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date: Date) => { return dayjs(date).format('DD/MM/YYYY'); },
    },
    { title: 'Chalan', dataIndex: 'chlnNo' },
    { title: "Product", dataIndex: ['product', 'name'] },
    { title: 'Unit', dataIndex: 'unit' },
    { title: 'CFT', dataIndex: 'qtyCFT' },
    { title: 'PIECES', dataIndex: 'qtyPieces' },
    { title: 'Rate', dataIndex: 'rate' },
    { title: 'Amount', dataIndex: 'amount' },
  ],
  displayLabels: ['date', 'product.name', 'chlnNo', 'unit', 'qtyPieces', 'amount'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',
  ADD_NEW_ENTITY: 'ADD Sale',
};


