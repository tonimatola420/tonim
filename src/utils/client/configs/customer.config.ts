interface IConfig { [key: string]: any; }

export const config: IConfig = {
  entity: 'customer',
  relations: { sector: true },
  dataTableTitle: 'Customers:',
  module: 'Customer',
  dataTableColumns: [
    { title: 'Code', dataIndex: 'ptms_code' },
    { title: 'Name', dataIndex: 'ptms_name' },
    { title: 'Nick', dataIndex: 'ptms_nicknm' },    
    { title: 'Phone', dataIndex: 'ptms_phone' },
    { title: "Sector", dataIndex: ['sector', 'sems_name'] },
  ],
  displayLabels: ['ptms_name'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',  
};
