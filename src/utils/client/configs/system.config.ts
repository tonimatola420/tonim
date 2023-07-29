interface IConfig { [key: string]: any; }

export const config: IConfig = {
  entity: 'rakeStatus',
  relations: 'rake',
  dataTableTitle: 'Rakes:',
  module: 'System',
  dataTableColumns: [    
    { title: '#N', dataIndex: 'id' },
    // { title: '#', key: 'index', render: (text: any, record: any,index: any) => index + 1, },
    { title: 'Sys', dataIndex: ['rake', 'system', 'syms_name'] },
    { title: 'Rake', dataIndex: ['rake', 'rams_code'] },
    { title: 'Code', dataIndex: ['product', 'prms_prdcd'] },
    { title: 'Product', dataIndex: ['product', 'prms_name'] },
    { title: 'Qty', dataIndex: 'rast_qty' },    
    { title: 'Vol(L)', dataIndex: 'rast_vol' },
    // { title: 'RakeVol(L)', dataIndex: ['rake', 'rams_totvol'] },    
  ],
  displayLabels: ['rake.rams_code'],
  deleteMessage: 'delete : ',
  modalTitle: 'Remove Item',  
};
