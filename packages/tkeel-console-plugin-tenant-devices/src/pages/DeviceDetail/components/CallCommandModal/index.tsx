import {
  Box,
  Button,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { isEmpty, merge } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { DATA_TYPE_CONFIG } from '@tkeel/console-business-components/src/components/DeviceCommandModal/components/CommandParamModal/DataType';
import {
  AceEditor,
  FormControl,
  FormField,
  Modal,
} from '@tkeel/console-components';
import { CommandItem, CommandParamItem } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useCallCommandMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCallCommandMutation';
import useDeviceDetailSocket from '@/tkeel-console-plugin-tenant-devices/hooks/websockets/useDeviceDetailSocket';

const getStringifyValue = (data: object) => {
  try {
    return JSON.stringify(data);
  } catch {
    return '';
  }
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: CommandItem;
  uid: string;
}
const { TextField } = FormField;
function getParsedValue(data: string): object {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export default function CallCommandModal({
  isOpen,
  onClose,
  data,
  uid,
}: Props) {
  const { commands } = useDeviceDetailSocket({
    id: uid,
  });
  const input = data.define?.fields?.input?.define?.fields ?? {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [commandList, setCommandList] = useState<any[]>([]);
  const inputList = Object.keys(input).map((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...input[key], id: key };
  });
  const { register, setValue, getValues, watch, reset } = useForm();
  const watchFields = watch();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useCallCommandMutation({
    uid,
    onSuccess: () => {
      toast.success('调用成功');
    },
  });
  useEffect(() => {
    if (isOpen) {
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const commandItem = commands[data.id];
      if (!isEmpty(commandItem)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setCommandList([commandItem, ...commandList]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, reset, data]);

  const handleConfirm = async () => {
    const formValues = getValues();
    Object.entries(formValues).forEach((cell) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const [key, value] = cell;
      const type = inputList.find((val) => val.id === key)?.type;
      if (type === 'struct') {
        merge(formValues, { [key]: getParsedValue(value as string) });
      }
      if (type === 'bool') {
        merge(formValues, { [key]: value === '1' });
      }
    });
    mutate({ data: { id: data.id, value: { input: formValues } } });
  };
  const renderInputItem = (item: CommandParamItem) => {
    const { name, id, type, define } = item;
    const fields = define?.fields ?? {};
    return (
      <Box
        p="12px 20px"
        bg="gray.50"
        mb="20px"
        fontSize="12px"
        borderRadius="4px"
        border="1px solid"
        borderColor="primary"
        key={id}
      >
        <Flex flexDir="row" justify="space-between">
          <HStack spacing="10px">
            <Text>{name}</Text>
            <Text color="grayAlternatives.300">{id}</Text>
          </HStack>
          <Text color="gray.500">{type}</Text>
        </Flex>
        {['int', 'float', 'double', 'string'].includes(type) && (
          <TextField
            id={id}
            inputStyle={{ background: 'white' }}
            registerReturn={register(id, {
              valueAsNumber: type !== 'string',
            })}
          />
        )}
        {type === 'bool' && (
          <FormControl id={id}>
            <RadioGroup
              defaultValue={Object.keys(fields)[0]}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={watchFields[id]}
              onChange={(value) => {
                setValue(id, value);
              }}
            >
              <Stack direction="row" spacing="12px">
                {Object.entries(fields).map((val) => (
                  <Radio
                    key={val[0]}
                    size="sm"
                    colorScheme="primary"
                    value={val[0]}
                  >
                    <Text fontSize="12px">{val[1]}</Text>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        )}
        {type === 'struct' && (
          <Box
            border="1px solid"
            borderColor="gray.200"
            marginY="10px"
            borderRadius="4px"
            overflow="hidden"
          >
            <AceEditor
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={watchFields[id]}
              readOnly={false}
              theme="light"
              language="json"
              width="100%"
              height="120px"
              onChange={(value) => {
                setValue(id, value);
              }}
            />
          </Box>
        )}
        <Flex flexDir="row">
          {Object.entries(fields).map((v) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [key, value] = v;
            return (
              <HStack
                mr="10px"
                w="auto"
                color="grayAlternatives.300"
                key={v[0]}
                spacing="2px"
              >
                <Text>{
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
                  `${DATA_TYPE_CONFIG[key].label}:`
                }</Text>
                <Text>{value}</Text>
              </HStack>
            );
          })}
        </Flex>
      </Box>
    );
  };
  return (
    <Modal
      width="900px"
      title="调用命令"
      isOpen={isOpen}
      onClose={onClose}
      hasCancelButton={false}
      hasConfirmButton={false}
      modalBodyStyle={{ padding: '12px 20px' }}
    >
      <HStack spacing="20px" align="flex-start" lineHeight="24px">
        <Flex w="400px" h="100%" align="center" flexDir="column">
          <Text fontSize="14px" fontWeight="500" lineHeight="24px" w="100%">
            请输入参数
          </Text>
          <Box marginY="12px" maxH="600px" overflowY="scroll" w="100%">
            {inputList.map((cell) => renderInputItem(cell as CommandParamItem))}
          </Box>
          <Button
            isLoading={isLoading}
            w="358px"
            colorScheme="primary"
            onClick={handleConfirm}
          >
            调用
          </Button>
        </Flex>
        <Flex w="440px" h="100%" flexDir="column">
          <Flex justify="space-between" w="100%">
            <Text fontSize="14px" fontWeight="500">
              输出结果
            </Text>
            <Button
              variant="text"
              color="gray.400"
              fontSize="12px"
              onClick={() => {
                setCommandList([]);
              }}
            >
              清空
            </Button>
          </Flex>
          <Box
            h="600px"
            overflowY="scroll"
            fontSize="12px"
            color="grayAlternatives.300"
          >
            {commandList.map((v, i) => (
              <Box
                p="12px"
                borderRadius="4px"
                bg="gray.50"
                marginY="12px"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                key={v?.id ?? i}
              >
                {getStringifyValue(v as object)}
              </Box>
            ))}
          </Box>
        </Flex>
      </HStack>
    </Modal>
  );
}
