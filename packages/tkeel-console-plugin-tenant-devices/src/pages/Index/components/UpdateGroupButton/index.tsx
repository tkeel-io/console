/* eslint-disable no-console */
import { useDisclosure } from '@chakra-ui/react';
import { MoreActionButton, toast } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { keyBy, mapValues } from 'lodash';

// import CustomModal from '@/tkeel-console-plugin-tenant-devices/components/CustomModal';
import useUpdateGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateGroupMutation';
import OperateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/OperateDeviceModal';
// import OperateDeviceModal from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/OperateDeviceModal';
import {
  CreateType,
  DeviceDefaultInfoType,
  DeviceValueType,
  ModalMode,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

interface Props {
  defaultFormValues: DeviceDefaultInfoType;
  refetch?: () => void;
}

function UpdateGroupButton({ defaultFormValues, refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSuccess = () => {
    toast({
      status: 'success',
      title: '修改设备组成功',
    });
    if (refetch) {
      refetch();
    }
  };

  const { isLoading, isSuccess, mutate } = useUpdateGroupMutation({
    id: defaultFormValues.id,
    onSuccess,
  });
  const handleConfirm = ({ formValues }: { formValues: DeviceValueType }) => {
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
          type={CreateType.GROUP}
          defaultFormValues={defaultFormValues}
          handleConfirm={handleConfirm}
          isSuccess={isSuccess}
        />
        // <CustomModal
        //   bg="red.50"
        //   icon={<TrashFilledIcon size="24px" color="red.300" />}
        //   title="确认删除设备「}」？"
        //   isConfirmButtonLoading={isLoading}
        //   isOpen={isOpen}
        //   onClose={onClose}
        //   onConfirm={() => {
        //     // mutate({});
        //   }}
        // />
      )}
    </>
  );
}

export default UpdateGroupButton;
