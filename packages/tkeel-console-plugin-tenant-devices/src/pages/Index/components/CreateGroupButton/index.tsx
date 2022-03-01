/* eslint-disable no-console */
import { Button, useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues } from 'lodash';
import { useEffect } from 'react';

import { toast } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

import useCreateDeviceGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';
import {
  DeviceValueType,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

import OperateDeviceModal from '../OperateDeviceModal';

interface Props {
  callback: () => void;
}

export default function CreateDeviceButton({ callback }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate, isSuccess, reset } = useCreateDeviceGroupMutation({
    onSuccess() {
      toast({
        status: 'success',
        title: '创建设备组成功',
      });
      if (callback) callback();
    },
  });
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);
  const handleConfirm = ({ formValues }: { formValues: DeviceValueType }) => {
    const { description, name, parentId, extendInfo } = formValues;
    const [id, ...rest] = parentId.split('&');
    const params = {
      description,
      name,
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId: id,
      parentName: rest.join('&'),
    };
    mutate({ data: params });
  };
  return (
    <>
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
      <OperateDeviceModal
        title="创建设备组"
        isOpen={isOpen}
        onClose={onClose}
        type={ModalType.GROUP}
        mode={ModalMode.CREATE}
        handleConfirm={handleConfirm}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
}
