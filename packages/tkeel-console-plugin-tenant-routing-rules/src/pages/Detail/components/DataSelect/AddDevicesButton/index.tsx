import { Text, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AddDevicesModal } from '@tkeel/console-business-components';
import { CreateButton } from '@tkeel/console-components';
import { DeviceItem } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import { RouteType } from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';
import useAddDevicesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useAddDevicesMutation';
import useRuleDevicesIdArrayQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDevicesIdArrayQuery';

import AddTemplateDevicesModal from '../AddTemplateDevicesModal';

type Props = {
  type?: 'button' | 'link';
  routeType: RouteType;
  refetchData: () => unknown;
};

export default function AddDeviceButton({
  type = 'button',
  routeType,
  refetchData,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id: ruleId } = useParams();

  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useAddDevicesMutation({
    ruleId: ruleId || '',
    onSuccess() {
      onClose();
      toast('添加设备成功', { status: 'success' });
      // TODO: 添加设备后有延迟，临时处理方案
      setTimeout(() => {
        refetchData();
      }, 800);
    },
  });

  const { deviceIds: hasSelectedDeviceIds } = useRuleDevicesIdArrayQuery(
    ruleId || ''
  );

  const onConfirm = (devices: DeviceItem[]) => {
    const deviceIds = devices.map((device) => device.id);
    mutate({
      data: {
        devices_ids: deviceIds,
      },
    });
  };

  return (
    <>
      {type === 'button' ? (
        <CreateButton onClick={onOpen}>选择设备</CreateButton>
      ) : (
        <Text
          color="primary"
          fontSize="14px"
          lineHeight="32px"
          fontWeight="500"
          cursor="pointer"
          onClick={onOpen}
        >
          添加设备
        </Text>
      )}
      {(() => {
        if (isOpen) {
          return routeType === 'time' ? (
            <AddTemplateDevicesModal
              isOpen={isOpen}
              isLoading={isLoading}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          ) : (
            <AddDevicesModal
              type="group"
              isOpen={isOpen}
              isLoading={isLoading}
              hasSelectedDeviceIds={hasSelectedDeviceIds}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          );
        }
        return null;
      })()}
    </>
  );
}
