import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useCreateCommandMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateCommandMutation';

import DeviceCommandModal, {
  DeviceCommandFormField,
} from '../DeviceCommandModal';

interface Props {
  uid: string;
  refetch: () => void;
}

export default function CreateCommandButton({
  uid,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { isLoading, mutate } = useCreateCommandMutation({
    uid,
    onSuccess: () => {
      toast.success('操作成功');
      onClose();
      refetch();
    },
  });
  const handleCreateCommand = (values: DeviceCommandFormField) => {
    const { mode, name, id, description } = values;
    const data = {
      [id]: {
        name,
        id,
        description,
        type: 'struct',
        define: {
          fields: {
            mode: {
              name: '',
              id: 'mode',
              type: 'string',
              define: {
                mode,
              },
            },
          },
        },
      },
    };
    mutate({ data });
  };
  return (
    <>
      <CreateButton onClick={onOpen}>添加命令</CreateButton>
      <DeviceCommandModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateCommand}
        isConfirmButtonLoading={isLoading}
      />
    </>
  );
}
