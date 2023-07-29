interface IConfig { [key: string]: any; }

export const config: IConfig = {
  entity: 'client',
  relations: '',
  dataTableTitle: 'Clients:',
  module: 'Client',
  dataTableColumns: [
    { title: 'Code', dataIndex: 'clms_code' },
    { title: 'Name', dataIndex: 'clms_name' },
    { title: 'Nick', dataIndex: 'clms_nicknm' },    
    { title: 'Phone', dataIndex: 'clms_phone' },
  ],
  displayLabels: ['clms_name'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',
  ADD_NEW_ENTITY: 'ADD SUPPLIER',
};

