import { Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { clone } from 'lodash';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  FormField,
  IconButton,
  Modal,
} from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

import AddCommandParamButton from './components/AddCommandParamButton';
import {
  CommandParamFormField,
  ParamType,
} from './components/CommandParamModal/types';
import EditCommandParamButton from './components/EditCommandParamButton';

const { TextField, TextareaField } = FormField;
// const MODE_TYPE = {
//   sync: '同步',
//   async: '异步',
// };
export enum CommandModeType {
  sync = 'sync',
  async = 'async',
}
export type DeviceCommandFormField = {
  name: string;
  id: string;
  description: string;
  // mode: CommandModeType;
  input: { [propName: string]: CommandParamFormField };
  output: { [propName: string]: CommandParamFormField };
};

const DEFAULT_VALUE = {
  name: '',
  id: '',
  description: '',
};

type Props = {
  onClose: () => void;
  isOpen: boolean;
  isEdit?: boolean;
  onSubmit: (values: DeviceCommandFormField) => void;
  isConfirmButtonLoading: boolean;
  defaultValues?: DeviceCommandFormField;
};

export default function DeviceCommandModal({
  isOpen,
  onClose,
  isEdit = false,
  onSubmit,
  isConfirmButtonLoading,
  defaultValues,
}: Props) {
  const {
    register,
    setValue,
    getValues,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<DeviceCommandFormField>({
    defaultValues: DEFAULT_VALUE,
  });
  const watchFields = watch();
  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      onSubmit(values);
    }
  };
  const handleAddParam = ({
    formValues,
    paramType,
  }: {
    formValues: CommandParamFormField;
    paramType: ParamType;
  }) => {
    const { id } = formValues;
    setValue(`${paramType}.${id}`, formValues);
  };

  const renderParamItem = ({
    item,
    paramType,
  }: {
    item: CommandParamFormField;
    paramType: ParamType;
  }) => {
    const { name, id } = item;

    return (
      <Flex
        key={id}
        fontSize="12px"
        width="100%"
        padding="6px 10px"
        bg="brand.50"
        borderRadius="4px"
      >
        <HStack color="gray.600">
          <Text fontWeight="500">参数名称：</Text>
          <Text fontWeight="400">{name}</Text>
        </HStack>
        <Spacer />
        <EditCommandParamButton
          paramType={paramType}
          handleConfirm={(formValues) => {
            handleAddParam({ paramType, formValues });
          }}
          defaultValues={item}
        />
        <IconButton
          lineHeight="24px"
          variant="link"
          size="sm"
          aria-label="delete"
          icon={<TrashFilledIcon size="14px" color="grayAlternatives.300" />}
          onClick={() => {
            const cloneVal = clone(getValues(paramType));
            delete cloneVal[id];
            setValue(paramType, cloneVal);
          }}
        />
      </Flex>
    );
  };
  useEffect(() => {
    if (isOpen) {
      if (!isEdit) {
        reset();
      } else {
        reset(defaultValues);
      }
    }
  }, [isOpen, isEdit, reset, defaultValues]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isEdit ? '编辑' : '新增'}命令`}
      onConfirm={handleConfirm}
      isConfirmButtonLoading={isConfirmButtonLoading}
    >
      <TextField
        label="命令名称"
        id="name"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请填写命令名称' },
        })}
      />
      <TextField
        label="命令ID"
        id="id"
        isDisabled={isEdit}
        error={errors.id}
        registerReturn={register('id', {
          required: { value: true, message: '请填写命令ID' },
        })}
      />
      {/* <FormControl id="mode" label="调用方式">
        <RadioGroup
          defaultValue={CommandModeType.sync}
          onChange={(value: CommandModeType) => {
            setValue('mode', value);
          }}
        >
          <Stack direction="row" spacing="12px">
            {Object.entries(MODE_TYPE).map((item) => (
              <Radio
                key={item[0]}
                size="sm"
                colorScheme="brand"
                value={item[0]}
              >
                {item[1]}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl> */}
      <TextareaField
        label="描述"
        id="description"
        registerReturn={register('description')}
      />
      <FormControl
        label="输入参数"
        id={ParamType.INPUT}
        formControlStyle={{ position: 'relative' }}
      >
        <Text fontSize="12px" color="gray.500">
          支持用户增加参数
        </Text>
        <AddCommandParamButton
          type={ParamType.INPUT}
          handleConfirm={(formValues) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            handleAddParam({ paramType: ParamType.INPUT, formValues });
          }}
        />
        <VStack spacing="8px" mt="12px">
          {Object.values(watchFields.input || {}).map(
            (item: CommandParamFormField) =>
              renderParamItem({ item, paramType: ParamType.INPUT })
          )}
        </VStack>
      </FormControl>
      <FormControl
        label="输出参数"
        id={ParamType.OUTPUT}
        formControlStyle={{ position: 'relative' }}
      >
        <Text fontSize="12px" color="gray.500">
          支持用户增加参数
        </Text>
        <AddCommandParamButton
          type={ParamType.OUTPUT}
          handleConfirm={(formValues) => {
            handleAddParam({ paramType: ParamType.OUTPUT, formValues });
          }}
        />
        <VStack spacing="8px" mt="12px">
          {Object.values(watchFields.output || {}).map(
            (item: CommandParamFormField) =>
              renderParamItem({ item, paramType: ParamType.OUTPUT })
          )}
        </VStack>
      </FormControl>
    </Modal>
  );
}
