import { Stack, Text } from '@chakra-ui/react';
import { map } from 'lodash';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Checkbox,
  CheckboxGroup,
  DeprecatedSelect,
  FormControl,
  FormField,
  TreeSelect,
} from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import {
  ConnectInfoType,
  ConnectOption,
  DeviceDefaultInfoType,
  DeviceFormFields,
  GroupOptions,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

const { TextField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceFormFields, object>;
  watchFields: DeviceFormFields;
  type: ModalType;
  mode: ModalMode;
  groupOptions: GroupOptions[];
  handleSelectTemplate?: (selected: boolean) => void;
  templateOptions: Array<{ label: string; id: string }>;
  defaultFormValues?: DeviceDefaultInfoType;
}
export default function BasicInfoPart({
  type,
  mode,
  formHandler,
  watchFields,
  groupOptions,
  // handleSelectTemplate,
  templateOptions,
  defaultFormValues,
}: Props) {
  const toast = plugin.getPortalToast();
  const { register, formState, setValue, clearErrors } = formHandler;
  const { errors } = formState;
  const { id = '' } = defaultFormValues || {};

  const getCurrentTree = (
    cur: string,
    tree: GroupOptions
  ): GroupOptions | null => {
    let findTree = null;
    if (tree.key === cur) {
      return tree;
    }
    if (tree.children.length > 0) {
      for (let i = 0; i < tree.children.length; i += 1) {
        const item = tree.children[i];
        findTree = getCurrentTree(cur, item);
        if (findTree) {
          return findTree;
        }
      }
    }

    return findTree;
  };

  const getTreeKey = (tree: GroupOptions, keyArray: Array<string> = []) => {
    const { children, key } = tree;
    keyArray.push(key);
    children.forEach((element) => {
      if (element.children.length > 0) {
        getTreeKey(element, keyArray);
      } else {
        keyArray.push(element.key);
      }
    });
    return keyArray;
  };

  const findTree = getCurrentTree(id, {
    key: 'root',
    title: '',
    children: groupOptions,
  });

  let disableKeys: Array<string> = [];
  if (findTree) {
    disableKeys = getTreeKey(findTree, []);
  }
  return (
    <>
      <TextField
        id="name"
        label={type === ModalType.DEVICE ? '????????????' : '???????????????'}
        registerReturn={register('name', {
          required: { value: true, message: '?????????????????????' },
        })}
        error={errors.name}
      />
      <FormControl
        id="parentId"
        label={type === ModalType.DEVICE ? '????????????' : '????????????'}
      >
        <TreeSelect
          id="parentId"
          allowClear={!!watchFields.parentId}
          placeholder="?????????????????????"
          extras={{ hideTreeIcon: true }}
          style={{ width: '100%' }}
          styles={{
            treeTitle: 'font-size:14px;height:32px;line-height:32px;',
          }}
          onClick={(e) => e.stopPropagation()}
          treeData={groupOptions}
          value={watchFields.parentId}
          notFoundContent="????????????"
          onChange={(value: string, label: ReactNode[]) => {
            if (disableKeys.includes(value)) {
              toast('?????????????????????????????????????????????', { status: 'error' });
              setValue('parentId', '');
              setValue('parentName', '');
            } else {
              setValue('parentId', value);
              setValue('parentName', label[0] as string);
            }
          }}
        />
      </FormControl>

      {type === ModalType.DEVICE && (
        <>
          <FormControl id="connectOption" label="??????????????????">
            <DeprecatedSelect
              placeholder="???????????????????????????"
              id="directConnection"
              value={watchFields.connectType}
              style={{ width: '100%' }}
              {...register('connectType', {
                required: { value: true, message: '???????????????????????????' },
              })}
              disabled={mode === ModalMode.EDIT}
              onChange={(value: string) => {
                if (value) {
                  setValue('connectType', value);
                  clearErrors('connectType');
                  if (value === ConnectOption.INDIRECT) {
                    setValue('connectInfo', [ConnectInfoType.useTemplate]);
                  }
                }
              }}
            >
              {map(ConnectOption, (value) => {
                return { label: value, value };
              }).map((item) => (
                <DeprecatedSelect.Option key={item.value} value={item.value}>
                  {item.label}
                </DeprecatedSelect.Option>
              ))}
            </DeprecatedSelect>
            {errors.connectType && (
              <Text color="red.500" fontSize="sm" mt="8px">
                ?????????????????????
              </Text>
            )}
          </FormControl>
          {watchFields.connectType && (
            <FormControl id="connectInfo">
              <CheckboxGroup
                onChange={(value: ConnectInfoType[]) => {
                  setValue('connectInfo', value);
                }}
                value={watchFields.connectInfo}
              >
                <Stack spacing="16px" direction="column">
                  <Checkbox
                    colorScheme="brand"
                    id="useTemplate"
                    value={ConnectInfoType.useTemplate}
                    isDisabled={
                      watchFields.connectType !== ConnectOption.DIRECT ||
                      mode === ModalMode.EDIT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      ??????????????????
                    </Text>
                  </Checkbox>
                  {(watchFields.connectInfo || []).includes(
                    ConnectInfoType.useTemplate
                  ) && (
                    <>
                      <DeprecatedSelect
                        placeholder="?????????????????????"
                        id="templateId"
                        value={watchFields.templateId}
                        style={{ width: '100%' }}
                        allowClear={!!watchFields.templateId}
                        disabled={mode === ModalMode.EDIT}
                        {...register('templateId')}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(value: string) => {
                          setValue('templateId', value);
                          setValue(
                            'templateName',
                            templateOptions.find((v) => v.id === value)
                              ?.label ?? ''
                          );
                          if (value) {
                            clearErrors('templateId');
                          }
                        }}
                      >
                        {templateOptions.map((val) => (
                          <DeprecatedSelect.Option value={val.id} key={val.id}>
                            {val.label}
                          </DeprecatedSelect.Option>
                        ))}
                      </DeprecatedSelect>
                      {errors.templateId && (
                        <Text color="red.500" fontSize="sm">
                          ?????????????????????
                        </Text>
                      )}
                    </>
                  )}

                  <Checkbox
                    colorScheme="brand"
                    id="selfLearn"
                    value={ConnectInfoType.selfLearn}
                    isDisabled={
                      watchFields.connectType !== ConnectOption.DIRECT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      ???????????????
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
        label="??????"
        placeholder="?????????"
        type="text"
        registerReturn={register('description')}
        error={errors.description}
      />
    </>
  );
}
