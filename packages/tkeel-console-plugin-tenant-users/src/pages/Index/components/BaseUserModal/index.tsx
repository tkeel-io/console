import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Box, VStack } from '@chakra-ui/react';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Modal,
} from '@tkeel/console-components';

import useRolesQuery from '@/tkeel-console-plugin-tenant-users/hooks/queries/useRolesQuery';

const { TextField } = FormField;

export interface FormFields {
  username?: {
    disabled?: boolean;
  };

  nick_name?: {
    disabled?: boolean;
  };

  roles?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  username: string;
  nick_name: string;
  roles: string[];
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields?: FormFields;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseUserModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const { data } = useRolesQuery();
  const roles = data?.roles ?? [];

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
        id="username"
        label="用户账号"
        isDisabled={formFields?.username?.disabled}
        // help="6~18 位字符串, 只能包含英文字母、数字、下划线"
        error={errors.username}
        schemas={register('username', {
          required: { value: true, message: '请输入正确的用户账号' },
        })}
      />
      <TextField
        id="nick_name"
        label="用户昵称"
        error={errors.nick_name}
        schemas={register('nick_name', {
          required: { value: false, message: '用户昵称' },
        })}
      />
      <FormControl id="roles" label="用户角色设置">
        <Box overflowY="auto" maxHeight="300px">
          <VStack
            spacing="12px"
            alignItems="flex-start"
            padding="16px 20px 20px 20px"
            borderRadius="4px"
            backgroundColor="gray.50"
          >
            <CheckboxGroup
              defaultValue={[]}
              onChange={(value: string[]) => {
                setValue('roles', value);
              }}
            >
              {roles.map((role) => (
                <Box key={role}>
                  <Checkbox value={role}>{role}</Checkbox>
                </Box>
              ))}
            </CheckboxGroup>
          </VStack>
        </Box>
      </FormControl>
    </Modal>
  );
}
