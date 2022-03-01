import { Stack, Text } from '@chakra-ui/react';
import { map } from 'lodash';
import { UseFormReturn } from 'react-hook-form';

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
} from '@tkeel/console-components';

import {
  ConnectInfoType,
  ConnectOption,
  DeviceValueType,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

const { TextField, SelectField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
  watchFields: DeviceValueType;
  type: ModalType;
  groupOptions: { label: string; value: string }[];
}
export default function BasicInfoPart({
  type,
  formHandler,
  watchFields,
  groupOptions,
}: Props) {
  const { register, formState, setValue } = formHandler;
  const { errors } = formState;

  return (
    <>
      <TextField
        id="name"
        label={type === ModalType.DEVICE ? '设备名称' : '设备组名称'}
        registerReturn={register('name', {
          required: { value: true, message: 'required' },
        })}
        error={errors.name}
      />
      <SelectField
        id="parentId"
        label={type === ModalType.DEVICE ? '设备分组' : '父设备组'}
        options={groupOptions || []}
        registerReturn={register('parentId')}
      />
      {type === ModalType.DEVICE && (
        <>
          <SelectField
            label="设备连接方式"
            id="directConnection"
            options={map(ConnectOption, (value) => {
              return { label: value, value };
            })}
            registerReturn={register('directConnection', {
              required: { value: true, message: 'required' },
            })}
            error={errors.directConnection}
          />
          <FormControl id="connectInfo">
            <CheckboxGroup
              onChange={(value: ConnectInfoType[]) => {
                setValue('connectInfo', value);
              }}
              value={
                watchFields.directConnection !== ConnectOption.DIRECT
                  ? [ConnectInfoType.useTemplate]
                  : watchFields.connectInfo
              }
            >
              <Stack spacing="16px" direction="column">
                <Checkbox
                  colorScheme="primary"
                  id="useTemplate"
                  // value={ConnectInfoType.useTemplate}
                  isDisabled
                  // isDisabled={
                  //   watchFields.directConnection !== ConnectOption.DIRECT
                  // }
                >
                  <Text color="gray.600" fontSize="14px">
                    使用设备模版
                  </Text>
                </Checkbox>
                <Checkbox
                  colorScheme="primary"
                  id="selfLearn"
                  value={ConnectInfoType.selfLearn}
                  isDisabled={
                    watchFields.directConnection !== ConnectOption.DIRECT
                  }
                >
                  <Text color="gray.600" fontSize="14px">
                    自学习模式
                  </Text>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
        </>
      )}
      <TextareaField
        id="description"
        label="描述"
        placeholder="请输入"
        type="text"
        registerReturn={register('description')}
        error={errors.description}
      />
    </>
  );
}
