/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { useDisclosure } from '@chakra-ui/react';
import { CreateButton, toast } from '@tkeel/console-components';
import { has, keyBy, mapValues } from 'lodash';

import CreateDeviceModal from '../CreateDeviceModal';
import {
  ConnectInfoType,
  ConnectOption,
  CreateType,
  DeviceValueType,
} from '../CreateDeviceModal/types';

import useCreateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';

function onSuccess() {
  toast({
    status: 'success',
    title: '创建设备成功',
  });
}
export default function CreateDeviceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate } = useCreateDeviceMutation({ onSuccess });
  const handleOk = ({ formValues }: { formValues: DeviceValueType }) => {
    console.log(formValues);
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
      selfLearn: has(connectInfo, ConnectInfoType.selfLearn),
      templateId: has(connectInfo, ConnectInfoType.useTemplate) ? '123' : '',
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId,
    };
    mutate({ data: params });
  };
  return (
    <>
      <CreateButton onClick={onOpen}>添加设备</CreateButton>
      <CreateDeviceModal
        isOpen={isOpen}
        onClose={onClose}
        type={CreateType.DEVICE}
        handleOk={handleOk}
        isLoading={isLoading}
        responseData={data}
      />
    </>
  );
}
