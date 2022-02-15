import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Text, Textarea } from '@chakra-ui/react';
import { FormField, Modal } from '@tkeel/console-components';

const { TextField } = FormField;

export interface FormFields {
  username?: {
    disabled?: boolean;
  };

  nick_name?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  username: string;
  nick_name?: string;
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
  const {
    // register,
    formState: { errors },
    trigger,
    getValues,
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
        label="订阅名称"
        isDisabled={formFields?.username?.disabled}
        error={errors.username}
        // schemas={register('username', {
        //   required: { value: true, message: '请输入正确的名称' },
        // })}
      />
      <Box>
        <Text color="var(--chakra-colors-gray-600)" fontSize="14px" mb="4px">
          用户名称
        </Text>
        <Textarea
          id="nick_name"
          // error={errors.nick_name}
          // schemas={register('nick_name', {
          //   required: { value: false, message: '用户名称' },
          // })}
        />
      </Box>
    </Modal>
  );
}
