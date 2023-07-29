import { Typography, Space, Divider, } from 'antd';
import HeaderContent from '@/components/Layout/LogoutMenu';
const { Title } = Typography;

interface IConfig {
  [key: string]: any;
}

export const config: IConfig = {
  entity: 'product',
  relations: '',
  dataTableTitle: 'Products:',
  module: 'Product',
  dataTableColumns: [
    { title: 'Name', dataIndex: 'name' },
        { title: "Sale Qty", dataIndex: 'saleQty' },
        { title: 'Amount', dataIndex: 'saleAmt' },
        { 
            title: 'Rate', 
            dataIndex: 'avgRate',
            render: (value: string) => {
                return parseInt(value);
            }
        },
  ], 
};


