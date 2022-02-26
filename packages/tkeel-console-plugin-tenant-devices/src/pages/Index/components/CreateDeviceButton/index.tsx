/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { useDisclosure } from '@chakra-ui/react';
import { has, keyBy, mapValues } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateButton, LinkButton, toast } from '@tkeel/console-components';

import useCreateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';

import CreateDeviceModal from '../CreateDeviceModal';
import {
  ConnectInfoType,
  ConnectOption,
  CreateType,
  DeviceValueType,
} from '../DeviceModalPart/types';

interface Props {
  variant: 'link' | 'solid';
}

export default function CreateDeviceButton({ variant }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setCompleted(false);
    }
  }, [isOpen]);
  const { data, isLoading, mutate } = useCreateDeviceMutation({
    onSuccess(resData) {
      const id = resData?.data?.deviceObject?.id ?? '';
      toast({
        status: 'success',
        title: '创建设备成功',
      });
      setCompleted(true);
      navigate(`/detail?id=${id}`);
    },
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
      selfLearn: has(connectInfo, ConnectInfoType.selfLearn),
      templateId: has(connectInfo, ConnectInfoType.useTemplate) ? '123' : '',
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId,
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
      <CreateDeviceModal
        title="创建设备"
        isOpen={isOpen}
        onClose={onClose}
        type={CreateType.DEVICE}
        handleConfirm={handleConfirm}
        isLoading={isLoading}
        responseData={data}
        completed={completed}
      />
    </>
  );
}
