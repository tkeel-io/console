/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues } from 'lodash';
import { useEffect } from 'react';

import { CreateButton, LinkButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useCreateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';
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
  variant: 'link' | 'solid';
  onSuccess?: ({ data }: { data: unknown }) => void;
  defaultFormValues?: DeviceDefaultInfoType;
}

export default function CreateDeviceButton({
  variant,
  onSuccess,
  defaultFormValues,
}: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate, isSuccess, reset } = useCreateDeviceMutation(
    {
      onSuccess(resData) {
        toast('创建设备成功', {
          status: 'success',
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
      templateId,
      templateName,
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
        defaultFormValues={defaultFormValues}
        isLoading={isLoading}
        responseData={data}
        isSuccess={isSuccess}
      />
    </>
  );
}
