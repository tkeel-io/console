import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { FloppyDiskFilledIcon } from '@tkeel/console-icons';
import { useUpdateAttributeMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { plugin } from '@tkeel/console-utils';

import { DeviceAttributeFormFields } from '../DeviceAttributeModal';

interface Props {
  selectedDevices: DeviceAttributeFormFields[];
  uid: string;
  refetch?: () => void;
}

function SaveAttributeButton({
  selectedDevices = [],
  refetch = () => {},
  uid,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();

  const { mutate, isLoading } = useUpdateAttributeMutation({
    id: uid,
    onSuccess() {
      toast('保存属性成功', { status: 'success' });
      refetch();
      onClose();
    },
  });

  const handleConfirm = () => {
    if (selectedDevices.length === 0) {
      toast('请选择属性', { status: 'error' });
      return null;
    }
    if (selectedDevices) {
      const params = {};
      selectedDevices.forEach((item) => {
        params[item.id] = item;
      });
      mutate({
        data: params,
      });
    }
    return null;
  };
  return (
    <>
      <MoreActionButton
        icon={<FloppyDiskFilledIcon color="grayAlternatives.300" size="12px" />}
        title="保存属性"
        onClick={onOpen}
      />
      <Alert
        icon="info"
        iconPosition="left"
        isOpen={isOpen}
        description="保存属性到设备后，支持将此属性同步到模板"
        title={
          selectedDevices.length === 1 ? (
            <>是否保存「{selectedDevices[0].name}」此条属性？</>
          ) : (
            <>是否批量保存 {selectedDevices.length} 条属性？</>
          )
        }
        onClose={onClose}
        isConfirmButtonLoading={isLoading}
        onConfirm={handleConfirm}
      />
    </>
  );
}
export default SaveAttributeButton;
