/* eslint-disable no-console */
import { useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues } from 'lodash';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useUpdateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateDeviceMutation';
import OperateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/OperateDeviceModal';
import {
  ConnectInfoType,
  ConnectOption,
  DeviceDefaultInfoType,
  DeviceValueType,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  defaultFormValues: DeviceDefaultInfoType;
  refetch?: () => void;
}

function UpdateDeviceButton({ defaultFormValues, refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSuccess = () => {
    toast({
      status: 'success',
      title: '修改设备成功',
    });
    if (refetch) {
      refetch();
    }
  };
  const { isLoading, mutate, isSuccess } = useUpdateDeviceMutation({
    id: defaultFormValues.id,
    onSuccess,
  });
  const handleConfirm = ({ formValues }: { formValues: DeviceValueType }) => {
    const {
      description,
      name,
      parentId,
      directConnection,
      connectInfo,
      extendInfo,
    } = formValues;
    const params = {
      description,
      name,
      directConnection: directConnection === ConnectOption.DIRECT,
      selfLearn: connectInfo?.includes(ConnectInfoType.selfLearn) ?? false,
      templateId:
        connectInfo?.includes(ConnectInfoType.useTemplate) ?? false
          ? '123'
          : '',
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId,
    };
    mutate({ data: params });
  };
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" />}
        title="修改信息"
        onClick={onOpen}
      />
      {isOpen && (
        <OperateDeviceModal
          title="修改设备信息"
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={onClose}
          mode={ModalMode.EDIT}
          type={ModalType.DEVICE}
          defaultFormValues={defaultFormValues}
          handleConfirm={handleConfirm}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
}

export default UpdateDeviceButton;
