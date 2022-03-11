import { Box, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { BasicInfo } from '@tkeel/console-business-components';
import { MoreAction } from '@tkeel/console-components';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import DeleteTenantButton from '@/tkeel-console-plugin-admin-tenants/components/DeleteTenantButton';
import ModifyTenantButton from '@/tkeel-console-plugin-admin-tenants/components/ModifyTenantButton';
import useTenantQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantQuery';

export default function BasicInfoCard() {
  const toast = plugin.getPortalToast();
  const { tenantId = '' } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useTenantQuery({ tenantId });
  const title = data?.title ?? '';
  const remark = data?.remark ?? '';
  const createdTime = data?.created_at ?? '';
  const admins = data?.admins ?? [];
  const userCount = data?.num_user ?? 0;

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
      value: (
        <Box flex="1" overflowX="hidden">
          {admins.map(({ username }) => (
            <Text key={username} isTruncated width="100%">
              {username}
            </Text>
          ))}
        </Box>
      ),
    },
    {
      label: '客户数',
      value: userCount,
    },
  ];

  const handleModifyTenantSuccess = () => {
    toast('修改成功', { status: 'success' });
    refetch();
  };

  const handleDeleteTenantSuccess = () => {
    toast('删除成功', { status: 'success' });
    navigate('/', { replace: true });
  };

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
              onSuccess={handleModifyTenantSuccess}
            />,
            <DeleteTenantButton
              key="delete"
              variant="menu"
              data={{ tenant_id: tenantId, title }}
              onSuccess={handleDeleteTenantSuccess}
            />,
          ]}
          styles={{
            actionList: { width: '130px' },
          }}
        />
      }
      name={title}
      desc={`备注：${remark}`}
      basicInfoList={basicInfoList}
    />
  );
}
