import { useParams } from 'react-router-dom';
import { BasicInfo } from '@tkeel/console-business-components';
import { MoreAction } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import DeleteTenantButton from '@/tkeel-console-plugin-admin-tenants/components/DeleteTenantButton';
import ModifyTenantButton from '@/tkeel-console-plugin-admin-tenants/components/ModifyTenantButton';
import useTenantQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantQuery';

export default function BasicInfoCard() {
  const { tenantId = '' } = useParams();
  const { data } = useTenantQuery({ tenantId });
  const title = data?.title ?? '';
  const remark = data?.remark ?? '';
  const createdTime = data?.created_at ?? '';

  const basicInfoList = [
    {
      label: '租户 ID',
      value: tenantId,
    },
    {
      label: '创建时间',
      value: formatDateTimeByTimestamp({ timestamp: createdTime }),
    },
    {
      label: '管理员',
      value: '',
    },
    {
      label: '客户数',
      value: '',
    },
  ];

  return (
    <BasicInfo
      icon="BoxTwoToneIcon"
      rightTopButton={
        <MoreAction
          buttons={[
            <ModifyTenantButton
              key="modify"
              variant="menu"
              data={{ tenant_id: tenantId, title, remark }}
              onSuccess={() => {}}
            />,
            <DeleteTenantButton
              key="delete"
              variant="menu"
              data={{ tenant_id: tenantId, title }}
              onSuccess={() => {}}
            />,
          ]}
        />
      }
      name={title}
      desc={`备注：${remark}`}
      basicInfoList={basicInfoList}
    />
  );
}
