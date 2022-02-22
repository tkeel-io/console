import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Divider, Text } from '@chakra-ui/react';
import {
  FormControl,
  FormField,
  Loading,
  Modal,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
import { union, without } from 'lodash';

import { getChildKeys, getParentKeys, getTreeData, TreeData } from './tree';

import usePermissionsQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/usePermissionsQuery';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  roleName: string;
  permissions?: string[];
  desc?: string;
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => void;
};

export default function BaseRoleModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const [keywords, setKeywords] = useState('');
  let params = {};
  if (keywords) {
    params = { ...params, key_words: keywords };
  }

  const { tree, isLoading } = usePermissionsQuery({ params });
  const treeData = getTreeData(tree);

  const {
    register,
    formState: { errors },
    watch,
    trigger,
    getValues,
    setValue,
  } = useForm<FormValues>({ defaultValues });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
    }
  };

  const permissions = watch('permissions') ?? [];

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <TextField
        id="roleName"
        label="角色名称"
        error={errors.roleName}
        registerReturn={register('roleName', {
          required: { value: true, message: '请输入正确的角色名称' },
        })}
      />
      <FormControl id="plugins" label="用户权限设置">
        <Box padding="12px" borderRadius="4px" backgroundColor="gray.50">
          <SearchInput
            width="100%"
            placeholder="搜索"
            inputGroupStyle={{ display: 'none', marginBottom: '12px' }}
            onSearch={setKeywords}
          />
          <Box>
            <Text
              paddingBottom="8px"
              color="grayAlternatives.400"
              fontSize="12px"
              lineHeight="150%"
            >
              资源名称
            </Text>
            <Divider backgroundColor="gray.200" />
            <Box overflow="auto" height="300px" paddingY="12px">
              {isLoading ? (
                <Loading styles={{ wrapper: { paddingTop: '12px' } }} />
              ) : (
                <Tree
                  treeData={treeData}
                  showIcon={false}
                  selectable
                  multiple
                  selectedKeys={permissions}
                  extras={{ isTreeTitleFullWidth: true }}
                  onSelect={(_selectedKeys, info) => {
                    const { selected, node } = info;
                    const key = node.key as string;
                    const children = (node.children as TreeData) ?? [];
                    let newPermissions = [];

                    if (selected) {
                      const parentKeys = getParentKeys({ keyValue: key });
                      newPermissions = union(permissions, parentKeys, [key]);
                    } else {
                      const childKeys = getChildKeys(children);
                      newPermissions = without(permissions, ...childKeys, key);
                    }

                    setValue('permissions', newPermissions);
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </FormControl>
      <TextareaField
        id="desc"
        label="描述"
        error={errors.roleName}
        registerReturn={register('desc')}
      />
    </Modal>
  );
}
