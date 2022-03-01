/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { useDisclosure } from '@chakra-ui/react';
import { has, keyBy, mapValues } from 'lodash';
import { useEffect } from 'react';

import { CreateButton, LinkButton, toast } from '@tkeel/console-components';

import useCreateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';
import OperateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/OperateDeviceModal';
import {
  ConnectInfoType,
  ConnectOption,
  DeviceValueType,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  variant: 'link' | 'solid';
  onSuccess?: ({ data }: { data: any }) => void;
}

export default function CreateDeviceButton({ variant, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate, isSuccess, reset } = useCreateDeviceMutation(
    {
      onSuccess(resData) {
        toast({
          status: 'success',
          title: '创建设备成功',
        });
        if (onSuccess) onSuccess({ data: resData.data });
      },
    }
  );
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);
  const handleConfirm = ({ formValues }: { formValues: DeviceValueType }) => {
    const {
      description,
      name,
      parentId,
      parentName,
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
      parentName,
    };
    mutate({ data: params });
  };
  return (
    <>
      {variant === 'link' && (
        <LinkButton onClick={onOpen} fontSize="14px" lineHeight="24px">
          添加设备
        </LinkButton>
      )}
      {variant === 'solid' && (
        <CreateButton onClick={onOpen}>添加设备</CreateButton>
      )}
      <OperateDeviceModal
        title="创建设备"
        isOpen={isOpen}
        onClose={onClose}
        type={ModalType.DEVICE}
        mode={ModalMode.CREATE}
        handleConfirm={handleConfirm}
        isLoading={isLoading}
        responseData={data}
        isSuccess={isSuccess}
      />
    </>
  );
}
