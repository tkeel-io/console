import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Center, Divider, Spinner, Text, VStack } from '@chakra-ui/react';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Modal,
  SearchInput,
} from '@tkeel/console-components';

import useTenantPluginsQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/useTenantPluginsQuery';

const { TextField } = FormField;

export interface FormValues {
  role: string;
  plugins: string[];
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseRoleModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const [keywords, setKeywords] = useState('');
  let params = {};

  if (keywords) {
    params = { ...params, key_words: keywords };
  }

  const { data, isLoading } = useTenantPluginsQuery({ params });
  const plugins = data?.plugins ?? [];

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<FormValues>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
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
        id="role"
        label="角色名称"
        error={errors.role}
        schemas={register('role', {
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
                <Center paddingTop="12px">
                  <Spinner />
                </Center>
              ) : (
                <CheckboxGroup
                  defaultValue={[]}
                  onChange={(value: string[]) => {
                    setValue('plugins', value);
                  }}
                >
                  <VStack spacing="18px" align="left" paddingTop="12px">
                    {plugins.map((plugin) => (
                      <Box key={plugin}>
                        <Checkbox
                          color="grayAlternatives.300"
                          fontSize="12px"
                          lineHeight="150%"
                          value={plugin}
                        >
                          {plugin}
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
    </Modal>
  );
}
