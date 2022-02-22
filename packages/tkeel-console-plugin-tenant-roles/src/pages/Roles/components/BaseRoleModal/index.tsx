import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Loading,
  Modal,
  SearchInput,
} from '@tkeel/console-components';

import usePermissionsQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/usePermissionsQuery';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  roleName: string;
  permissionList: { path: string }[];
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

  const { permissions, isLoading } = usePermissionsQuery({ params });

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
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
                <CheckboxGroup
                  // TODO: tmp
                  // defaultValue={defaultValues?.permissionList}
                  defaultValue={[]}
                  onChange={(value: string[]) => {
                    setValue(
                      'permissionList',
                      value.map((id) => ({ path: id }))
                    );
                  }}
                >
                  <VStack spacing="18px" align="left" paddingTop="12px">
                    {permissions.map(({ permission }) => (
                      <Box key={permission.id}>
                        <Checkbox
                          color="grayAlternatives.300"
                          fontSize="12px"
                          lineHeight="150%"
                          value={permission.id}
                        >
                          {permission.name}
                        </Checkbox>
                      </Box>
                    ))}
                  </VStack>
                </CheckboxGroup>
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
