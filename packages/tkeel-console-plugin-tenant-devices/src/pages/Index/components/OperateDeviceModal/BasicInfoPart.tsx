/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
const templateOption = [
  {
    label: '测试模版_1',
    id: 'iot-3decd8f3-d0c4-4923-81f2-a559f2b707da',
  },
  {
    label: '测试模版_2',
    id: 'iot-eb871989-e839-4451-ab62-534da8686b4e',
  },
];

interface Props {
  formHandler: UseFormReturn<DeviceFormFields, object>;
  watchFields: DeviceFormFields;
  type: ModalType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupOptions: any;
  handleSelectTemplate?: (selected: boolean) => void;
}
export default function BasicInfoPart({
  type,
  formHandler,
  watchFields,
  groupOptions,
  handleSelectTemplate,
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
          onChange={(value: string, label: ReactNode[]) => {
            if (value) {
              setValue('parentId', value);
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
                  // if (value === ConnectOption.INDIRECT) {
                  //   setValue('connectInfo', [ConnectInfoType.useTemplate]);
                  // }
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
                  if (handleSelectTemplate) {
                    handleSelectTemplate(
                      value.includes(ConnectInfoType.useTemplate)
                    );
                  }
                }}
                value={watchFields.connectInfo}
              >
                <Stack spacing="16px" direction="column">
                  <Checkbox
                    colorScheme="primary"
                    id="useTemplate"
                    value={ConnectInfoType.useTemplate}
                    isDisabled
                    // isDisabled={
                    //   watchFields.connectType !== ConnectOption.DIRECT
                    // }
                  >
                    <Text color="gray.600" fontSize="14px">
                      使用设备模版
                    </Text>
                  </Checkbox>
                  {(watchFields.connectInfo || []).includes(
                    ConnectInfoType.useTemplate
                  ) && (
                    <>
                      <Select
                        placeholder="请选择设备模版"
                        id="templateId"
                        value={watchFields.templateId}
                        style={{ width: '100%' }}
                        allowClear
                        disabled
                        {...register('templateId', {
                          required: (watchFields.connectInfo || []).includes(
                            ConnectInfoType.useTemplate
                          ),
                        })}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(value: string, option: any) => {
                          setValue('templateId', value);
                          setValue('templateName', option?.children ?? '');
                          if (value) {
                            clearErrors('templateId');
                          }
                        }}
                      >
                        {templateOption.map((val) => (
                          <Select.Option value={val.id} key={val.id}>
                            {val.label}
                          </Select.Option>
                        ))}
                      </Select>
                      {errors.templateId && (
                        <Text color="red.500" fontSize="sm">
                          请选择设备模版
                        </Text>
                      )}
                    </>
                  )}

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
