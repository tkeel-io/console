import { Text, useDisclosure } from '@chakra-ui/react';
import { IconButton, toast } from '@tkeel/console-components';
import { AlarmLampFilledIcon, LightningFilledIcon } from '@tkeel/console-icons';

import CustomModal from '@/tkeel-console-plugin-tenant-devices/components/CustomModal';
import useUnsubscribeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUnsubscribeMutation';

type Props = {
  id: string;
  deviceName: string;
  disabled: boolean;
};

function Index({ deviceName, id, disabled }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useUnsubscribeMutation({
    id,
    onSuccess() {
      toast({ status: 'success', title: '取消成功' });
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({});
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<LightningFilledIcon size="12px" />}
        colorScheme="white"
        isFullWidth
        height="32px"
        cursor="pointer"
        borderRadius="4px"
        color="gray.600"
        p="0 0 0 14px"
        display="flex"
        justifyContent="flex-start"
        boxShadow="none"
        _hover={{
          backgroundColor: 'primary',
          '& > span > svg': {
            fill: 'white !important',
          },
          '&': {
            color: 'white',
          },
          '& > span > svg > path': {
            color: 'white',
          },
        }}
        isDisabled={disabled}
      >
        <Text fontWeight="400" ml="-2px">
          取消订阅
        </Text>
      </IconButton>
      <CustomModal
        bg="red.50"
        icon={<AlarmLampFilledIcon size="24px" />}
        title={`确认取消订阅设备「${deviceName}」？`}
        isConfirmButtonLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default Index;
