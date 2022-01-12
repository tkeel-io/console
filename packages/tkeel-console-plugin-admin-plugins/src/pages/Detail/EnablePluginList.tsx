import { Column } from 'react-table';
import { Table } from '@tkeel/console-components';

type Data = {
  enableTime: string;
  tenantSpace: string;
  tenantID: string;
  adminAccount: string;
  remark: string;
  userNumber: string;
};

function EnablePluginList() {
  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '启用时间',
      accessor: 'enableTime',
    },
    {
      Header: '租户空间',
      accessor: 'tenantSpace',
    },
    {
      Header: '租户ID',
      accessor: 'tenantID',
    },
    {
      Header: '管理员账号',
      accessor: 'adminAccount',
    },
    {
      Header: '备注',
      accessor: 'remark',
    },
    {
      Header: '用户数',
      accessor: 'userNumber',
    },
  ];

  const data: Data[] = Array.from({ length: 10 }).map((_, index) => {
    return {
      id: index,
      enableTime: '2021-04-32 12:11:11',
      tenantSpace: 'IDC项目',
      tenantID: 'ID_20111010',
      adminAccount: 'esthera@simmmple.com',
      remark: 'IDC项目',
      userNumber: '10',
    };
  });
  return <Table columns={columns} data={data} />;
}

export default EnablePluginList;
