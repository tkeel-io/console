/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  DeviceFormFields,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

const { TextField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceFormFields, object>;
  watchFields: DeviceFormFields;
  type: ModalType;
  groupOptions: any;
}
export default function BasicInfoPart({
  type,
  formHandler,
  watchFields,
  groupOptions,
}: Props) {
  const { register, formState, setValue, clearErrors } = formHandler;
  const { errors } = formState;
  return (
    <>
      <TextField
        id="name"
        label={type === ModalType.DEVICE ? '设备名称' : '设备组名称'}
        registerReturn={register('name', {
          required: { value: true, message: '请填写设备名称' },
        })}
        error={errors.name}
      />
      <FormControl
        id="parentId"
        label={type === ModalType.DEVICE ? '设备分组' : '父设备组'}
      >
        <TreeSelect
          id="parentId"
          allowClear
          placeholder="请选择设备分组"
          extras={{ hideTreeIcon: true }}
          style={{ width: '100%' }}
          styles={{
            treeTitle: 'font-size:14px;height:32px;line-height:32px;',
          }}
          treeData={groupOptions}
          defaultValue={watchFields.parentId}
          notFoundContent="暂无选项"
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
              value={watchFields.connectType}
              style={{ width: '100%' }}
              {...register('connectType', {
                required: { value: true, message: '请选择设备连接方式' },
              })}
              onChange={(value: string) => {
                if (value) {
                  setValue('connectType', value);
                  clearErrors('connectType');
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
            {errors.connectType && (
              <Text color="red.500" fontSize="sm" mt="8px">
                请选择连接方式
              </Text>
            )}
          </FormControl>
          {watchFields.connectType && (
            <FormControl id="connectInfo">
              <CheckboxGroup
                onChange={(value: ConnectInfoType[]) => {
                  setValue('connectInfo', value);
                }}
                value={
                  watchFields.connectType !== ConnectOption.DIRECT
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
                      watchFields.connectType !== ConnectOption.DIRECT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      自学习模式
                    </Text>
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          )}
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
