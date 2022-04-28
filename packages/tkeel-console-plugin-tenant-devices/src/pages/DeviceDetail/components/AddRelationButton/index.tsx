import { Button, useDisclosure } from '@chakra-ui/react';

import { AddFilledIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';
import { AttributeItem, TelemetryItem } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useCreateDeviceRelationMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceRelationMutation';
import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import {
  AttributeRelationItem,
  TelemetryRelationItem,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/types';

import DeviceRelationModal from '../DeviceRelationModal';

interface Props {
  type: 'telemetry' | 'attributes';
  deviceObject: DeviceObject;
  configInfo: TelemetryRelationItem | AttributeRelationItem;
  refetch?: () => void;
}
export default function AddRelationButton({
  type,
  deviceObject,
  configInfo,
  refetch = () => {},
}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id: uid } = deviceObject;
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useCreateDeviceRelationMutation({
    uid,
    onSuccess: () => {
      toast.success('操作成功');
      onClose();
      refetch();
    },
  });
  const handleConfirm = ({
    device,
    configItem,
  }: {
    device: DeviceItem;
    configItem: AttributeItem | TelemetryItem | null;
    // eslint-disable-next-line unicorn/consistent-function-scoping
  }) => {
    const deviceName = device?.properties?.basicInfo?.name ?? '';
    const configId = configItem?.id ?? '';
    const configName = configItem?.name ?? '';
    const expressionItem = {
      description: `${device?.id}=${deviceName},${configId}=${configName}`,
      expression: `${device?.id}.${type}.${configId}`,
      name: '',
      path: `${type}.${configInfo.id}`,
    };
    mutate({ data: { expressions: [expressionItem] } });
  };
  return (
    <>
      <Button
        padding="4px 8px"
        height="28px"
        boxShadow="none"
        bg="gray.50"
        fontSize="12px"
        borderRadius="4px"
        color="grayAlternatives.300"
        leftIcon={<AddFilledIcon color="grayAlternatives.300" />}
        border="1px solid"
        borderColor="grayAlternatives.50"
        _hover={{ background: 'white' }}
        _active={{ background: 'white' }}
        onClick={onOpen}
      >
        绑定关系
      </Button>
      <DeviceRelationModal
        type={type}
        isOpen={isOpen}
        onClose={onClose}
        uid={uid}
        onConfirm={handleConfirm}
        isConfirmButtonLoading={isLoading}
      />
    </>
  );
}
