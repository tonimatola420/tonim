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
  entity: 'grn',
  relations: 'grnItem',
  dataTableTitle: 'Grns:',
  module: 'Grn',
  dataTableColumns: [
    { title: '#N', dataIndex: 'id', },
    { title: 'Grn-Date', dataIndex: 'grhd_grndt', render: (date: Date) => { return dayjs(date).format('DD/MM/YYYY'); }, },
    { title: 'Invoice-No.', dataIndex: ['grhd_inv_no'], colSpan: 1, },
    { title: 'VehicleNo.', dataIndex: ['grhd_veh_no'], colSpan: 1, },
    { title: 'Client.', dataIndex: ['client', 'clms_name'], colSpan: 1, },
    
  ],
  displayLabels: ['grhd_grndt', 'grhd_veh_no'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',
  ADD_NEW_ENTITY: 'ADD GRN',
};

