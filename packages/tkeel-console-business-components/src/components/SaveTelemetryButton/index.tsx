import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { FloppyDiskFilledIcon } from '@tkeel/console-icons';
import {
  TelemetryFormFields,
  useCreateTelemetryMutation,
} from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

interface Props {
  selectedDevices: TelemetryFormFields[];
  uid: string;
  refetch?: () => void;
  source: 'temp' | 'device';
}

function SaveTelemetryButton({
  selectedDevices,
  refetch = () => {},
  uid,
  source,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();

  const { mutate, isLoading } = useCreateTelemetryMutation({
    uid,
    onSuccess() {
      toast('保存遥测成功', { status: 'success' });
      refetch();
      onClose();
    },
  });

  const handleConfirm = () => {
    if (selectedDevices) {
      const params = {};
      selectedDevices.forEach((item) => {
        params[item.id] = item;
      });
      mutate({
        data: {
          tele: params,
          source,
        },
      });
    }
    return null;
  };
  return (
    <>
      <MoreActionButton
        icon={<FloppyDiskFilledIcon color="grayAlternatives.300" size="12px" />}
        title="保存遥测"
        onClick={onOpen}
      />
      <Alert
        icon="info"
        iconPosition="left"
        isOpen={isOpen}
        description="保存遥测到设备后，支持将此遥测同步到模板"
        title={
          selectedDevices.length === 1 ? (
            <>是否保存「{selectedDevices[0].name}」此条遥测？</>
          ) : (
            <>是否批量保存 {selectedDevices.length} 条遥测？</>
          )
        }
        onClose={onClose}
        isConfirmButtonLoading={isLoading}
        onConfirm={handleConfirm}
      />
    </>
  );
}
export default SaveTelemetryButton;
