import { useDisclosure } from '@chakra-ui/react';

import {
  CreateButton,
  LinkButton,
  MoreActionButton,
} from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useCreateNetworkMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useCreateNetworkMutation';
import useModifyNetworkMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useModifyNetworkMutation';

import { FormValues } from '../BaseNetworkModal';
import CopyCommandModal from '../CopyCommandModal';
import CreateNetworkModal from '../CreateNetworkModal';

interface Props {
  id?: string;
  networkName?: string;
  token?: string;
  type: 'createButton' | 'createText' | 'editButton';
  onSuccess: () => void;
}

export default function CreateNetworkButton({
  id,
  networkName,
  token,
  type,
  onSuccess,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const useOperationMutation =
    type === 'editButton' ? useModifyNetworkMutation : useCreateNetworkMutation;
  const { isLoading, mutate, data } = useOperationMutation({
    id: id ?? '',
    onSuccess() {
      onSuccess();
      onClose();
      onSuccessModalOpen();
    },
  });
  const commandData = data?.client?.command ?? '';
  const commandId = data?.client?.id ?? '';
  const handleConfirm = (formValues: FormValues) => {
    const createData = {
      name: formValues?.networkName,
    };
    const editData = {
      client: {
        name: formValues?.networkName,
      },
    };
    mutate({
      data: type === 'editButton' ? editData : createData,
    });
  };

  return (
    <>
      {type === 'createButton' && (
        <CreateButton onClick={onOpen}>创建代理网关</CreateButton>
      )}
      {type === 'createText' && (
        <LinkButton onClick={onOpen} fontSize="14px" lineHeight="24px">
          创建
        </LinkButton>
      )}
      {type === 'editButton' && (
        <MoreActionButton
          icon={<PencilFilledIcon />}
          title="编辑代理网关"
          onClick={onOpen}
        />
      )}
      {isOpen && (
        <CreateNetworkModal
          networkName={networkName ?? ''}
          type={type}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
      {isSuccessModalOpen && (
        <CopyCommandModal
          isOpen={isSuccessModalOpen}
          title={type === 'editButton' ? '编辑代理网关' : '创建代理网关'}
          copyData={commandData}
          token={token ?? ''}
          id={commandId}
          onClose={onSuccessModalClose}
        />
      )}
    </>
  );
}
