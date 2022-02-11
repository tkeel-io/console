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

import { ConnectInfoType, DeviceValueType } from './types';

const { TextField, SelectField, TextareaField } = FormField;

const CONNECT_OPTION = {
  DIRECT: '直连',
  INDIRECT: '非直连',
};

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
  watchFields: DeviceValueType;
}
export default function BasicInfoPart({ formHandler, watchFields }: Props) {
  const { register, formState, setValue } = formHandler;
  const { errors } = formState;
  // eslint-disable-next-line no-console
  console.log(watchFields);
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
        id="parent"
        label="父设备组"
        options={[{ value: 1, label: '默认设备组' }]}
        registerReturn={register('parent', {
          required: { value: true, message: 'required' },
        })}
        error={errors.parent}
      />
      <SelectField
        label="设备连接方式"
        id="directConnection"
        options={map(CONNECT_OPTION, (value) => {
          return { label: value, value };
        })}
        registerReturn={register('directConnection', {
          required: { value: true, message: 'required' },
        })}
        error={errors.directConnection}
      />
      <FormControl id="connectOption">
        <CheckboxGroup
          onChange={(value: ConnectInfoType[]) => {
            setValue('connectOption', value);
          }}
          value={
            watchFields.directConnection === '非直连'
              ? [ConnectInfoType.useTemplate]
              : watchFields.connectOption
          }
        >
          <Stack spacing="16px" direction="column">
            <Checkbox
              colorScheme="primary"
              id="useTemplate"
              value={ConnectInfoType.useTemplate}
              isDisabled={watchFields.directConnection === '非直连'}
            >
              <Text color="gray.600" fontSize="14px">
                使用设备模版
              </Text>
            </Checkbox>
            <Checkbox
              colorScheme="primary"
              id="selfLearn"
              value={ConnectInfoType.selfLearn}
              isDisabled={watchFields.directConnection === '非直连'}
            >
              <Text color="gray.600" fontSize="14px">
                自学习模式
              </Text>
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>
      <TextareaField
        id="desc"
        label="描述"
        placeholder="请输入"
        type="text"
        registerReturn={register('desc')}
        error={errors.desc}
      />
    </>
  );
}
