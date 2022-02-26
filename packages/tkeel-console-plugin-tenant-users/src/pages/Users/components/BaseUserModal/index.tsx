import { Box, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Modal,
} from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import useRolesQuery from '@/tkeel-console-plugin-tenant-users/hooks/queries/useRolesQuery';

const { TextField } = FormField;

export interface FormFields {
  username?: {
    disabled?: boolean;
  };

  nick_name?: {
    disabled?: boolean;
  };

  roleIds?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  username: string;
  nick_name?: string;
  roleIds: string[];
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
  const { roles } = useRolesQuery();

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<FormValues>({
    defaultValues,
  });

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
        help={schemas.username.help}
        error={errors.username}
        registerReturn={register('username', schemas.username.registerOptions)}
      />
      <TextField
        id="nick_name"
        label="用户名称"
        error={errors.nick_name}
        registerReturn={register('nick_name')}
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
              defaultValue={defaultValues?.roleIds ?? []}
              onChange={(value: string[]) => {
                setValue('roleIds', value);
              }}
            >
              {roles.map(({ id, name }) => (
                <Box key={id}>
                  <Checkbox value={id}>{name}</Checkbox>
                </Box>
              ))}
            </CheckboxGroup>
          </VStack>
        </Box>
      </FormControl>
    </Modal>
  );
}
