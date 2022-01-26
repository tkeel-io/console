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

import useRolesQuery from '@/tkeel-console-plugin-tenant-users/hooks/queries/useRolesQuery';

const { TextField } = FormField;

export interface FormValues {
  username: string;
  nick_name: string;
  roles: string[];
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseUserModal({
  title,
  isOpen,
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
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <TextField
        id="username"
        label="用户账号"
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
          required: { value: true, message: '用户昵称' },
        })}
      />
      <FormControl id="roles" label="用户角色设置">
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
