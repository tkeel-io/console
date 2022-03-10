/* eslint-disable no-console */
import { useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues } from 'lodash';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useUpdateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateDeviceMutation';
import { TreeNodeType } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import OperateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/OperateDeviceModal';
import {
  ConnectInfoType,
  ConnectOption,
  DeviceDefaultInfoType,
  DeviceFormFields,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  defaultFormValues: DeviceDefaultInfoType;
  refetch?: () => void;
  groupTree?: TreeNodeType;
}

function UpdateDeviceButton({ defaultFormValues, refetch, groupTree }: Props) {
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
    id: defaultFormValues.id as string,
    onSuccess,
  });
  const handleConfirm = ({ formValues }: { formValues: DeviceFormFields }) => {
    const {
      description,
      name,
      parentId,
      parentName,
      connectType,
      connectInfo,
      extendInfo,
      templateId,
      templateName,
    } = formValues;
    const params = {
      description,
      name,
      directConnection: connectType === ConnectOption.DIRECT,
      selfLearn: connectInfo?.includes(ConnectInfoType.selfLearn) ?? false,
      templateId: connectInfo?.includes(ConnectInfoType.useTemplate)
        ? templateId
        : '',
      templateName: connectInfo?.includes(ConnectInfoType.useTemplate)
        ? templateName
        : '',
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId: parentId || '',
      parentName: parentName || '',
    };
    mutate({ data: params });
  };
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon color="grayAlternatives.300" size="12px" />}
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
          groupTree={groupTree}
        />
      )}
    </>
  );
}

export default UpdateDeviceButton;
