import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { IconButton } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

import useAuthIdProviderRegisterMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useAuthIdProviderRegisterMutation';

import ConfigModal from './ConfigModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateConfigButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tenantId = '' } = useParams();
  const { isLoading, mutate } = useAuthIdProviderRegisterMutation({
    tenantId,
    onSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  return (
    <>
      <IconButton
        borderColor="gray.100"
        borderRadius="4px"
        height="72px"
        backgroundColor="white"
        color="grayAlternatives.300"
        _active={{ opacity: '0.7' }}
        variant="outline"
        isFullWidth
        icon={<AddFilledIcon size="16px" />}
        onClick={onOpen}
      >
        新建配置
      </IconButton>
      {isOpen && (
        <ConfigModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          // value={yaml}
          onClose={onClose}
          onConfirm={(formValues) => {
            mutate({ data: formValues });
          }}
        />
      )}
    </>
  );
}
