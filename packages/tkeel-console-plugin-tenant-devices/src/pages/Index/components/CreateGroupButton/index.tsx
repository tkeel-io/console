/* eslint-disable no-console */
import { Button, useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues } from 'lodash';
import { useEffect } from 'react';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

import useCreateDeviceGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';
import { TreeNodeType } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import {
  DeviceDefaultInfoType,
  DeviceFormFields,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

import OperateDeviceModal from '../OperateDeviceModal';

interface Props {
  type?: 'MORE_ACTION';
  callback: () => void;
  defaultFormValues?: DeviceDefaultInfoType;
  groupTree?: TreeNodeType;
}

export default function CreateDeviceButton({
  type,
  callback,
  defaultFormValues,
  groupTree,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate, isSuccess, reset } = useCreateDeviceGroupMutation({
    onSuccess() {
      toast({
        status: 'success',
        title: '创建设备组成功',
      });
      if (callback)
        window.setTimeout(() => {
          callback();
        }, 300);
    },
  });
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset, isSuccess]);
  const handleConfirm = ({ formValues }: { formValues: DeviceFormFields }) => {
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
      {type === 'MORE_ACTION' ? (
        <MoreActionButton
          icon={<AddFilledIcon size="12px" />}
          title="添加设备组"
          onClick={onOpen}
        />
      ) : (
        <Button
          h="32px"
          fontSize="12px"
          leftIcon={<AddFilledIcon color="grayAlternatives.300" />}
          onClick={onOpen}
          variant="outline"
          colorScheme="gray"
          borderRadius="4px"
          w="100%"
          color="grayAlternatives.300"
        >
          添加组
        </Button>
      )}
      <OperateDeviceModal
        title="创建设备组"
        isOpen={isOpen}
        onClose={onClose}
        type={ModalType.GROUP}
        mode={ModalMode.CREATE}
        handleConfirm={handleConfirm}
        isLoading={isLoading}
        isSuccess={isSuccess}
        defaultFormValues={defaultFormValues}
        groupTree={groupTree}
      />
    </>
  );
}
