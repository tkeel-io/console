/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { Stack, Text } from '@chakra-ui/react';
import { map } from 'lodash';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Select,
  TreeSelect,
} from '@tkeel/console-components';

import {
  ConnectInfoType,
  ConnectOption,
  DeviceValueType,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

const { TextField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
  watchFields: DeviceValueType;
  type: ModalType;
  groupOptions: any;
}
export default function BasicInfoPart({
  type,
  formHandler,
  watchFields,
  groupOptions,
}: Props) {
  const { register, formState, setValue } = formHandler;
  const { errors } = formState;
  console.log('groupOptions', groupOptions);
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
      <FormControl
        id="parentId"
        label={type === ModalType.DEVICE ? '设备分组' : '父设备组'}
      >
        <TreeSelect
          id="parentId"
          placeholder="请选择设备分组"
          style={{ width: '100%' }}
          treeData={groupOptions}
          treeIcon={false}
          defaultValue={watchFields.parentId}
          onChange={(value: any, label: ReactNode[]) => {
            if (value) {
              setValue('parentId', value as string);
              setValue('parentName', label[0] as string);
            }
          }}
        />
      </FormControl>

      {type === ModalType.DEVICE && (
        <>
          <FormControl id="connectOption" label="设备连接方式">
            <Select
              placeholder="请选择设备连接方式"
              id="directConnection"
              style={{ width: '100%' }}
              onChange={(value: string) => {
                if (value) {
                  setValue('directConnection', value);
                }
              }}
            >
              {map(ConnectOption, (value) => {
                return { label: value, value };
              }).map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </FormControl>
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
