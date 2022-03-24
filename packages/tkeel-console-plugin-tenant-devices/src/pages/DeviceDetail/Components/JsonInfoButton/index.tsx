import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { AceEditor, Modal } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useSetAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetAttributeValueMutation';

type Props = {
  deviceId: string;
  id: string;
  defaultValue: object;
  refetch?: () => void;
};

const getEditorValue = (data: unknown) => {
  try {
    return JSON.stringify(data, null, '\t');
  } catch {
    return '';
  }
};

const getParsedValue = (data: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(data);
  } catch {
    return {};
  }
};

function isJSON(str: string) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function JsonInfoButton({
  id,
  defaultValue,
  deviceId,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultEditorValue = getEditorValue(defaultValue);
  const [editorValue, setEditorValue] = useState(defaultEditorValue);
  const [isJson, setIsJson] = useState(true);
  const toast = plugin.getPortalToast();

  const params = {
    id: deviceId,
    onSuccess: () => {
      toast.success('保存成功');
      refetch();
      onClose();
    },
  };
  const { mutate: setAttributeMutate, isLoading } =
    useSetAttributeMutation(params);
  const onConfirm = () => {
    setIsJson(true);
    if (editorValue && isJSON(editorValue)) {
      setAttributeMutate({
        data: {
          id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value: getParsedValue(editorValue),
        },
      });
    } else {
      setIsJson(false);
    }
  };
  return (
    <>
      <Box
        h="40px"
        w="100%"
        borderRadius="4px"
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        p="8px 16px"
        cursor="pointer"
        onClick={onOpen}
      >
        <Text color="primary" fontSize="14px" lineHeight="24px">
          JSON
        </Text>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="属性值"
        onConfirm={onConfirm}
        isConfirmButtonLoading={isLoading}
      >
        <AceEditor
          height="260px"
          value={editorValue}
          readOnly={false}
          onChange={(value: string) => {
            setEditorValue(value);
          }}
        />
        {!isJson && (
          <Text color="red.500" fontSize="12px" mt="12px">
            请输入JSON数据
          </Text>
        )}
      </Modal>
    </>
  );
}
