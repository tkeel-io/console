import { Box, Button, Text } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { RequestData as TemplateBasicField } from '@tkeel/console-request-hooks/src/hooks/mutations/useSaveAsOtherTemplateMutation';

import ButtonsHStack from '@/tkeel-console-components/components/ButtonsHStack';

const { TextField, TextareaField } = FormField;

type Props = {
  title: ReactNode;
  isOpen: boolean;
  supportRef?: boolean;
  isConfirmButtonLoading: boolean;
  isConfirmRefButtonLoading?: boolean;
  defaultValues?: TemplateBasicField;
  onClose: () => unknown;
  onConfirm: (formValues: TemplateBasicField) => unknown;
  onConfirmRef?: (formValues: TemplateBasicField) => unknown;
};

export default function CreateTemplateBasicModal({
  title,
  isOpen,
  supportRef = false,
  isConfirmButtonLoading,
  isConfirmRefButtonLoading = false,
  defaultValues,
  onClose,
  onConfirm,
  onConfirmRef,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<TemplateBasicField>({ defaultValues });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
    }
  };

  const handleConfirmRef = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      if (onConfirmRef) {
        onConfirmRef(formValues);
      }
    }
  };

  const footer = supportRef ? (
    <ButtonsHStack>
      <Button
        onClick={() => {
          reset();
          onClose();
        }}
      >
        取消
      </Button>
      <Button
        isLoading={isConfirmButtonLoading}
        colorScheme="brand"
        onClick={handleConfirm}
      >
        仅保存
      </Button>
      <Button
        isLoading={isConfirmRefButtonLoading}
        colorScheme="brand"
        onClick={handleConfirmRef}
      >
        保存并引用
      </Button>
    </ButtonsHStack>
  ) : (
    ''
  );

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
      footer={footer}
    >
      <TextField
        id="name"
        label="模板名称"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请输入模板名称' },
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
