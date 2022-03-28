import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

import { RequestData as TemplateBasicField } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSaveAsOtherTemplateMutation';

const { TextField, TextareaField } = FormField;

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: TemplateBasicField;
  onClose: () => unknown;
  onConfirm: (formValues: TemplateBasicField) => unknown;
};

export default function BaseSubscriptionModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<TemplateBasicField>({ defaultValues });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
      reset();
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <TextField
        id="title"
        label="模板名称"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请输入模版名称' },
        })}
      />
      <Box>
        <Text color="gray.600" fontSize="14px" mb="4px">
          描述
        </Text>
        <TextareaField
          id="description"
          error={errors.description}
          registerReturn={register('description')}
        />
      </Box>
    </Modal>
  );
}
