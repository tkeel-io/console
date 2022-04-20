import { useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues, merge } from 'lodash';

import { CreateButton } from '@tkeel/console-components';
import { useCreateCommandMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { plugin } from '@tkeel/console-utils';

import DeviceCommandModal, {
  DeviceCommandFormField,
} from '../DeviceCommandModal';
import { CommandParamFormField } from '../DeviceCommandModal/components/CommandParamModal/types';

interface Props {
  uid: string;
  refetch?: () => void;
}

function dealWidthFields({
  label,
  data,
}: {
  label: string;
  data: { [propName: string]: CommandParamFormField };
}) {
  const result = {};
  Object.entries(data).forEach((item) => {
    const { fields, name, type } = item[1];
    merge(result, {
      [item[0]]: {
        // id,
        name,
        type,
        define: {
          fields: mapValues(keyBy(fields, 'key'), 'value'),
        },
      },
    });
  });
  return {
    name: label,
    type: 'struct',
    define: {
      fields: result,
    },
  };
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
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleCreateCommand = (values: DeviceCommandFormField) => {
    const { input, output, name, id, description } = values;
    const inputCopy = dealWidthFields({ label: '输入', data: input || {} });
    const outputCopy = dealWidthFields({ label: '输出', data: output || {} });
    const data = {
      [id]: {
        name,
        id,
        description,
        type: 'struct',
        define: {
          fields: {
            input: inputCopy,
            output: outputCopy,
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
        isEdit={false}
        onClose={onClose}
        onSubmit={handleCreateCommand}
        isConfirmButtonLoading={isLoading}
      />
    </>
  );
}
