import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useAddDevicesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useAddDevicesMutation';
import useDeleteDevicesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteDevicesMutation';

// import useRouteRulesQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRouteRulesQuery';
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

  // const {} = useRouteRulesQuery();

  const toast = plugin.getPortalToast();
  const { mutate: addMutate, isLoading: isAddDevicesLoading } =
    useAddDevicesMutation({
      ruleId: selectedRuleId,
      onSuccess() {
        toast('移动路由成功', { status: 'success' });
      },
    });

  const { mutate: deleteMutate, isLoading: isDeleteTargetLoading } =
    useDeleteDevicesMutation({
      ruleId: id || '',
      onSuccess() {
        refetchData();
        addMutate({
          data: {
            devices_ids: selectedIds,
          },
        });
      },
    });

  const handleConfirm = (ruleId: string) => {
    setSelectedRuleId(ruleId);
    if (ruleId && ruleId !== id) {
      deleteMutate({
        params: {
          devices_ids: selectedIds.join(','),
        },
      });
    }
  };

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
        data={[
          { label: '测试路由01', value: '33' },
          { label: '测试路由02', value: '34' },
        ]}
        defaultValue="33"
        isOpen={isOpen}
        isConfirmButtonLoading={isDeleteTargetLoading || isAddDevicesLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
