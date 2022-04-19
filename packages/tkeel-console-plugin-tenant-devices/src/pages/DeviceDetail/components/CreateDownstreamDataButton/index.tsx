import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components/src/components/Button';
import { plugin } from '@tkeel/console-utils';

import useSetDownstreamDataMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetDownstreamDataMutation';

import DownstreamDataModal, {
  DownstreamFormField,
} from '../DownstreamDataModal';

interface Props {
  deviceId: string;
}

export default function CreateDownstreamDataButton({ deviceId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useSetDownstreamDataMutation({
    id: deviceId,
    onSuccess: () => {
      toast.success('操作成功');
      onClose();
    },
  });
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit = (formValues: DownstreamFormField) => {
    mutate({ data: { value: formValues.downstream } });
  };
  return (
    <>
      <CreateButton onClick={onOpen}>下行反控</CreateButton>
      {isOpen && (
        <DownstreamDataModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
