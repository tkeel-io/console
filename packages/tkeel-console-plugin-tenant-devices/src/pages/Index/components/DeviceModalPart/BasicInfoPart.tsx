// eslint-disable-next-line import/no-extraneous-dependencies
import { UseFormReturn } from 'react-hook-form';
import { Stack, Text } from '@chakra-ui/react';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
} from '@tkeel/console-components';
import { map, values } from 'lodash';

import {
  ConnectInfoType,
  ConnectOption,
  CreateType,
  DeviceValueType,
} from './types';

import useGroupTreeQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

const { TextField, SelectField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
  watchFields: DeviceValueType;
  type: CreateType;
}
export default function BasicInfoPart({
  type,
  formHandler,
  watchFields,
}: Props) {
  const { groupTree } = useGroupTreeQuery();
  const { register, formState, setValue } = formHandler;
  const { errors } = formState;
  const deviceGroupOptions = values(groupTree).map((item) => {
    const id = item.nodeInfo?.id;
    const label = item.nodeInfo?.properties?.group?.name;
    return { label, value: id };
  });
  return (
    <>
      <TextField
        id="name"
        label={type === CreateType.DEVICE ? '设备名称' : '设备组名称'}
        registerReturn={register('name', {
          required: { value: true, message: 'required' },
        })}
        error={errors.name}
      />
      <SelectField
        id="parentId"
        label={type === CreateType.DEVICE ? '设备分组' : '父设备组'}
        options={deviceGroupOptions}
        registerReturn={register('parentId', {})}
      />
      {type === CreateType.DEVICE && (
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
