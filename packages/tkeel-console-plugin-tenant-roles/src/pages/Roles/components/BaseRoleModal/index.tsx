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

import { RequestData } from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';
import usePermissionsQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/usePermissionsQuery';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  roleName: string;
  desc?: string;
  permissionPaths?: string[];
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (requestData: RequestData) => void;
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
      const { roleName, permissionPaths = [], desc } = getValues();
      const requestData: RequestData = {
        name: roleName,
      };
      if (permissionPaths.length > 0) {
        const permissionList = permissionPaths.map((path) => ({ path }));
        requestData.permission_list = permissionList;
      }
      if (desc) {
        requestData.desc = desc;
      }
      onConfirm(requestData);
    }
  };

  const permissionPaths = watch('permissionPaths') ?? [];

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
      <FormControl
        id="plugins"
        label="用户权限设置"
        help="选择父权限不会自动选择子权限，选择子权限会自动选择父权限；取消选择父权限会自动取消选择子权限，取消选择子权限不会自动取消选择父权限。"
      >
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
                  selectedKeys={permissionPaths}
                  extras={{ isTreeTitleFullWidth: true }}
                  onSelect={(_selectedKeys, info) => {
                    const { selected, node } = info;
                    const key = node.key as string;
                    const children = (node.children as TreeData) ?? [];
                    let newPermissionPaths = [];

                    if (selected) {
                      const parentKeys = getParentKeys({ keyValue: key });
                      newPermissionPaths = union(permissionPaths, parentKeys, [
                        key,
                      ]);
                    } else {
                      const childKeys = getChildKeys(children);
                      newPermissionPaths = without(
                        permissionPaths,
                        ...childKeys,
                        key
                      );
                    }

                    setValue('permissionPaths', newPermissionPaths);
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
        error={errors.desc}
        registerReturn={register('desc')}
      />
    </Modal>
  );
}
