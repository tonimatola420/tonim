interface IConfig { [key: string]: any; }

export const config: IConfig = {
  entity: 'sector',
  relations: '',
  dataTableTitle: 'Sectors:',
  module: 'Sector',
  dataTableColumns: [
    { title: 'Name', dataIndex: 'sems_name' },
    { title: 'From', dataIndex: 'sems_from' },
    { title: 'To', dataIndex: 'sems_to' },    
    { title: 'Range', dataIndex: 'sems_range' },
  ],
  displayLabels: ['sems_name'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',  
};
