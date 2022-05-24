import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useAddDevicesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useAddDevicesMutation';
import useDeleteDevicesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteDevicesMutation';
import useRouteRulesQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRouteRulesQuery';

import MoveRoutingRuleModal from '../MoveRoutingRuleModal';

type Props = {
  selectedIds: string[];
  refetchData: () => unknown;
};

export default function MoveRoutingRuleButton({
  selectedIds,
  refetchData,
}: Props) {
  const { id } = useParams();
  const [selectedRuleId, setSelectedRuleId] = useState(id || '');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { routeRulesData } = useRouteRulesQuery({
    pageNum: 1,
    pageSize: 100_000,
  });

  const ruleModalData = routeRulesData
    .filter((rule) => rule.id !== id)
    .map((item) => ({
      label: item.name,
      value: item.id,
    }));

  const toast = plugin.getPortalToast();
  const { mutate: addMutate, isLoading: isAddDevicesLoading } =
    useAddDevicesMutation({
      ruleId: selectedRuleId,
      onSuccess() {
        toast('移动路由成功', { status: 'success' });
        onClose();
      },
    });

  const { mutate: deleteMutate, isLoading: isDeleteTargetLoading } =
    useDeleteDevicesMutation({
      ruleId: id || '',
      onSuccess() {
        // TODO: 移除设备后有延迟，临时处理方案
        setTimeout(() => {
          refetchData();
        }, 500);
        addMutate({
          data: {
            devices_ids: selectedIds,
          },
        });
      },
    });

  const handleConfirm = (ruleId: string) => {
    setSelectedRuleId(ruleId);
    if (ruleId) {
      deleteMutate({
        params: {
          devices_ids: selectedIds.join(','),
        },
      });
    }
  };

  const defaultValue = ruleModalData[0]?.value ?? '';

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="移动路由"
        onClick={() => {
          onOpen();
        }}
      />
      <MoveRoutingRuleModal
        data={ruleModalData}
        defaultValue={defaultValue}
        isOpen={isOpen}
        isConfirmButtonLoading={isDeleteTargetLoading || isAddDevicesLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
