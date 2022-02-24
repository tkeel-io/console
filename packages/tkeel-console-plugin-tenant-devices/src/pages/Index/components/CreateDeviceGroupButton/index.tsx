/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { Button, useDisclosure } from '@chakra-ui/react';
import { toast } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';
import { keyBy, mapValues } from 'lodash';

import CreateDeviceGroupModal from '../CreateDeviceGroupModal';
import {
  CreateType,
  DeviceValueType,
  ModalMode,
} from '../DeviceModalPart/types';

import useCreateDeviceGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';

function onSuccess() {
  toast({
    status: 'success',
    title: '创建设备组成功',
  });
}
export default function CreateDeviceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate } = useCreateDeviceGroupMutation({
    onSuccess,
  });
  const handleConfirm = ({ formValues }: { formValues: DeviceValueType }) => {
    console.log(formValues);
    const { description, name, parentId, extendInfo } = formValues;
    const params = {
      description,
      name,
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId,
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
      <CreateDeviceGroupModal
        isOpen={isOpen}
        onClose={onClose}
        type={CreateType.GROUP}
        mode={ModalMode.CREATE}
        handleConfirm={handleConfirm}
        isLoading={isLoading}
        responseData={data}
      />
    </>
  );
}
