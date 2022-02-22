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

import { getTreeData } from './tree';

import usePermissionsQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/usePermissionsQuery';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  roleName: string;
  permissionList?: { path: string }[];
  desc?: string;
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
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
    trigger,
    getValues,
    // setValue,
  } = useForm<FormValues>({ defaultValues });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      // TODO: tmp
      formValues.permissionList = [
        { path: 'console-plugin-tenant-users' },
        { path: 'core-broker' },
      ];
      onConfirm(formValues);
    }
  };

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
          <SearchInput width="100%" placeholder="搜索" onSearch={setKeywords} />
          <Box paddingTop="12px">
            <Text
              paddingBottom="8px"
              color="grayAlternatives.400"
              fontSize="12px"
              lineHeight="150%"
            >
              资源名称
            </Text>
            <Divider backgroundColor="gray.200" />
            <Box overflowY="auto" maxHeight="300px">
              {isLoading ? (
                <Loading styles={{ wrapper: { paddingTop: '12px' } }} />
              ) : (
                <Tree
                  treeData={treeData}
                  fieldNames={{ title: 'name' }}
                  // eslint-disable-next-line react/no-unstable-nested-components
                  /* titleRender={(node) => (
                    <div style={{ width: '100%' }}>{node.title}</div>
                  )} */
                  showIcon={false}
                  selectable
                  multiple
                  extras={{ isTreeTitleFullWidth: true }}
                  /* onSelect={(selectedKeys) => {
                    console.log(selectedKeys);
                  }} */
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
