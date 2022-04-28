import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';
import { AttributeItem, TelemetryItem } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useUpdateDeviceRelation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateDeviceRelation';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
// import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import {
  AttributeRelationItem,
  TelemetryRelationItem,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/types';

import DeviceRelationModal from '../DeviceRelationModal';

interface Props {
  // deviceObject: DeviceObject;
  type: 'telemetry' | 'attributes';
  uid: string;
  configInfo: TelemetryRelationItem | AttributeRelationItem;
  refetch?: () => void;
}
export default function UpdateRelationButton({
  type,
  uid,
  configInfo,
  refetch = () => {},
}: // deviceObject,
Props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useUpdateDeviceRelation({
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
  const deviceId = configInfo?.deviceId ?? '';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const configId = configInfo[`${type}Id`];
  const { deviceObject } = useDeviceDetailQuery({ id: deviceId });
  const basicInfo = deviceObject?.properties?.basicInfo;
  const parentType = basicInfo?.parentName ? 'group' : 'template';
  const parentId =
    (parentType === 'group' ? basicInfo?.parentId : basicInfo?.templateId) ||
    '';
  const defaultValues = {
    parentType,
    parentId,
    deviceId,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    configId,
  };
  return (
    <>
      <MoreActionButton
        title="编辑关系"
        onClick={onOpen}
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
      />
      <DeviceRelationModal
        operateType="edit"
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        uid={uid}
        onConfirm={handleConfirm}
        isConfirmButtonLoading={isLoading}
        defaultValues={defaultValues}
      />
    </>
  );
}
