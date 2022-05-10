import { useDisclosure } from '@chakra-ui/react';

import {
  CreateButton,
  LinkButton,
  MoreActionButton,
} from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useCreateProxyMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useCreateProxyMutation';
import useModifyProxyMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useModifyProxyMutation';

import { FormValues } from '../BaseProxyModal';
import CreateProxyModal from '../CreateProxyModal';

interface Props {
  proxyCruxData?: FormValues;
  type: 'createButton' | 'createText' | 'editButton';
  onSuccess: () => void;
}

export default function CreateProxyButton({
  type,
  proxyCruxData,
  onSuccess,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const useOperationMutation =
    type === 'editButton' ? useModifyProxyMutation : useCreateProxyMutation;
  const { isLoading, mutate } = useOperationMutation({
    id: '',
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({
      data: {
        name: formValues?.proxyName,
        ip: formValues?.proxyIp,
        port: formValues?.proxyPort,
        agree: formValues?.proxyAgree,
        remark: formValues?.proxyRemark,
      },
    });
  };

  return (
    <>
      {type === 'createButton' && (
        <CreateButton onClick={onOpen}>创建代理服务</CreateButton>
      )}
      {type === 'createText' && (
        <LinkButton onClick={onOpen} fontSize="14px" lineHeight="24px">
          创建
        </LinkButton>
      )}
      {type === 'editButton' && (
        <MoreActionButton
          icon={<PencilFilledIcon />}
          title="编辑代理服务"
          onClick={onOpen}
        />
      )}
      {isOpen && (
        <CreateProxyModal
          type={type}
          isOpen={isOpen}
          proxyCruxData={proxyCruxData}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
