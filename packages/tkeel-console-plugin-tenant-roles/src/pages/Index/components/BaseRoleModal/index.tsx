import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@chakra-ui/react';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Modal,
} from '@tkeel/console-components';

import useRolesQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/useRolesQuery';

const { TextField } = FormField;

export interface FormValues {
  role: string;
  nick_name: string;
  roles: string[];
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
  const { data } = useRolesQuery();
  const roles = data?.roles ?? [];

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
        <Box padding="20px" borderRadius="4px" backgroundColor="gray.50">
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
        </Box>
      </FormControl>
    </Modal>
  );
}
