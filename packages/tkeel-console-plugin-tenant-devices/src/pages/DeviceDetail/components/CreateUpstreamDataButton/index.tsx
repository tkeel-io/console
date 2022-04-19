import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components/src/components/Button';
import { plugin } from '@tkeel/console-utils';

import useSetUpstreamDataMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetUpstreamDataMutation';

import UpstreamDataModal, { UpstreamFormField } from '../UpstreamDataModal';

interface Props {
  deviceId: string;
}

export default function CreateUpstreamDataButton({ deviceId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useSetUpstreamDataMutation({
    id: deviceId,
    onSuccess: () => {
      toast.success('操作成功');
      onClose();
    },
  });
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit = (formValues: UpstreamFormField) => {
    mutate({ data: { value: formValues.upstream } });
  };
  return (
    <>
      <CreateButton onClick={onOpen}>下行反控</CreateButton>
      {isOpen && (
        <UpstreamDataModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
