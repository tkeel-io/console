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
  clientId: string;
  proxyCruxData?: FormValues;
  type: 'createButton' | 'createText' | 'editButton';
  onSuccess: () => void;
}

export default function CreateProxyButton({
  type,
  clientId,
  proxyCruxData,
  onSuccess,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const useOperationMutation =
    type === 'editButton' ? useModifyProxyMutation : useCreateProxyMutation;
  const { isLoading, mutate } = useOperationMutation({
    id: proxyCruxData?.proxyId || '',
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({
      data: {
        client_id: Number(clientId),
        name: formValues?.proxyName,
        host: formValues?.proxyIp,
        port: formValues?.proxyPort,
        protocol: formValues?.proxyAgree,
        remark: formValues?.proxyRemark,
        device_id: formValues?.proxyDeviceId,
        device_name: formValues?.proxyDeviceName,
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
