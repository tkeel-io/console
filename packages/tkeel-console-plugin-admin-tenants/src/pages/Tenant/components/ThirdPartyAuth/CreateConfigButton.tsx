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
  const { isOpen, onClose } = useDisclosure();
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
      <IconButton variant="outline" icon={<AddFilledIcon size="16px" />}>
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
