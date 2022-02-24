import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { MoreActionButton, toast } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { has, keyBy, mapValues } from 'lodash';

import useUpdateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateDeviceMutation';
import { DeviceApiItem } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';
import CreateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateDeviceModal';
import {
  ConnectInfoType,
  ConnectOption,
  CreateType,
  DeviceValueType,
  ModalMode,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/DeviceModalPart/types';

interface Props {
  deviceInfo: DeviceApiItem;
}

function EditDeviceButton({ deviceInfo }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [completed, setCompleted] = useState(false);
  const onSuccess = () => {
    toast({
      status: 'success',
      title: '修改设备成功',
    });
    setCompleted(true);
  };
  useEffect(() => {
    if (isOpen) {
      setCompleted(false);
    }
  }, [isOpen]);

  const { isLoading, mutate } = useUpdateDeviceMutation({
    id: deviceInfo.id,
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
      selfLearn: has(connectInfo, ConnectInfoType.selfLearn),
      templateId: has(connectInfo, ConnectInfoType.useTemplate) ? '123' : '',
      ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
      parentId,
    };
    mutate({ data: params });
  };
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="修改信息"
        onClick={onOpen}
      />
      {isOpen && (
        <CreateDeviceModal
          title="修改设备信息"
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={onClose}
          mode={ModalMode.EDIT}
          type={CreateType.DEVICE}
          defaultFormValues={deviceInfo}
          handleConfirm={handleConfirm}
          completed={completed}
        />
      )}
    </>
  );
}

export default EditDeviceButton;
