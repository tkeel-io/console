/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues } from 'lodash';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useUpdateGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateGroupMutation';
import { TreeNodeType } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import OperateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/OperateDeviceModal';
import {
  DeviceDefaultInfoType,
  DeviceValueType,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  defaultFormValues: DeviceDefaultInfoType;
  callback?: () => void;
  groupTree: TreeNodeType;
}

function UpdateGroupButton({ defaultFormValues, callback, groupTree }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSuccess = () => {
    toast({
      status: 'success',
      title: '修改设备组成功',
    });
    if (callback) {
      window.setTimeout(() => {
        callback();
      }, 300);
    }
  };

  const { isLoading, isSuccess, mutate } = useUpdateGroupMutation({
    id: defaultFormValues.id as string,
    onSuccess,
  });
  const handleConfirm = ({ formValues }: { formValues: DeviceValueType }) => {
    const { description, name, parentId, extendInfo, parentName } = formValues;

    const params = {
      description,
      name,
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId,
      parentName,
    };
    mutate({ data: params });
  };
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" />}
        title="编辑设备组"
        onClick={onOpen}
      />
      {isOpen && (
        <OperateDeviceModal
          title="编辑设备组信息"
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={onClose}
          mode={ModalMode.EDIT}
          type={ModalType.GROUP}
          defaultFormValues={defaultFormValues}
          handleConfirm={handleConfirm}
          isSuccess={isSuccess}
          groupTree={groupTree}
        />
      )}
    </>
  );
}

export default UpdateGroupButton;
