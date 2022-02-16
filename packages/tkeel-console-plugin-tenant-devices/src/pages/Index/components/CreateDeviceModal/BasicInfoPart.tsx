// eslint-disable-next-line import/no-extraneous-dependencies
import { UseFormReturn } from 'react-hook-form';
import { Stack, Text } from '@chakra-ui/react';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
} from '@tkeel/console-components';
import { map } from 'lodash';

import { ConnectInfoType, ConnectOption, DeviceValueType } from './types';

const { TextField, SelectField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
  watchFields: DeviceValueType;
}
export default function BasicInfoPart({ formHandler, watchFields }: Props) {
  const { register, formState, setValue } = formHandler;
  const { errors } = formState;
  return (
    <>
      <TextField
        id="name"
        label="设备组名称"
        registerReturn={register('name', {
          required: { value: true, message: 'required' },
        })}
        error={errors.name}
      />
      <SelectField
        id="parentId"
        label="父设备组"
        options={[{ value: 1, label: '默认设备组' }]}
        registerReturn={register('parentId', {
          required: { value: true, message: 'required' },
        })}
        error={errors.parentId}
      />
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
            watchFields.directConnection === ConnectOption.INDIRECT
              ? [ConnectInfoType.useTemplate]
              : watchFields.connectInfo
          }
        >
          <Stack spacing="16px" direction="column">
            <Checkbox
              colorScheme="primary"
              id="useTemplate"
              value={ConnectInfoType.useTemplate}
              isDisabled={
                watchFields.directConnection === ConnectOption.INDIRECT
              }
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
                watchFields.directConnection === ConnectOption.INDIRECT
              }
            >
              <Text color="gray.600" fontSize="14px">
                自学习模式
              </Text>
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>
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
