import { useDisclosure } from '@chakra-ui/react';
import { keyBy, mapValues, merge } from 'lodash';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { useUpdateCommandMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import {
  CommandItem,
  CommandParamItem,
} from '@tkeel/console-types/src/types/device';
import { plugin } from '@tkeel/console-utils';

import DeviceCommandModal, {
  DeviceCommandFormField,
} from '../DeviceCommandModal';
import { CommandParamFormField } from '../DeviceCommandModal/components/CommandParamModal/types';

interface Props {
  uid: string;
  data: CommandItem;
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
function formatFields(data: {
  define?: {
    fields?: {
      [propName: string]: CommandParamItem;
    };
  };
}) {
  const allFields = data?.define?.fields ?? {};
  const result = {};
  Object.entries(allFields).forEach((item) => {
    const fields = item[1].define?.fields ?? {};
    merge(result, {
      [item[0]]: {
        ...item[1],
        fields: Object.keys(fields).map((v) => {
          return {
            key: v,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: fields[v],
          };
        }),
      },
    });
  });
  return result;
}
function getDefaultValues(data: CommandItem) {
  const { name, id, description, define } = data;
  const input = define?.fields?.input ?? {};
  const output = define?.fields?.output ?? {};
  return {
    name,
    id,
    description,
    input: formatFields(input),
    output: formatFields(output),
  };
}

export default function UpdateCommandButton({
  uid,
  data,
  // defaultValues,
  refetch = () => {},
}: Props) {
  const defaultValues = getDefaultValues(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { isLoading, mutate } = useUpdateCommandMutation({
    uid,
    onSuccess: () => {
      toast.success('编辑成功');
      onClose();
      refetch();
    },
  });
  const handleUpdateCommand = (values: DeviceCommandFormField) => {
    const { input, output, name, id, description } = values;
    const inputCopy = dealWidthFields({ label: '输入', data: input || {} });
    const outputCopy = dealWidthFields({ label: '输出', data: output || {} });
    const reqData = {
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
    mutate({ data: reqData });
  };
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="编辑命令"
        onClick={onOpen}
      />
      <DeviceCommandModal
        defaultValues={defaultValues}
        isOpen={isOpen}
        isEdit
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onSubmit={handleUpdateCommand}
      />
    </>
  );
}
