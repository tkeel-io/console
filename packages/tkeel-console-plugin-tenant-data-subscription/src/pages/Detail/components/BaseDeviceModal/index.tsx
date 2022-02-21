import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import {
  // Checkbox,
  // CheckboxGroup,
  // FormControl,
  // FormField,
  // Loading,
  Modal,
  // SearchInput,
} from '@tkeel/console-components';

// import useTenantPluginsQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useTenantPluginsQuery';

// const { TextField } = FormField;

export interface FormFields {
  role?: {
    disabled?: boolean;
  };

  plugins?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  role: string;
  plugins: string[];
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

export default function BaseDeviceModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const [keywords, setKeywords] = useState('');
  let params = {};

  if (keywords) {
    params = { ...params, key_words: keywords };
    if (formFields && params) {
      setKeywords('123');
    }
  }

  // const { plugins, isLoading } = useTenantPluginsQuery({ params });

  const {
    // register,
    // formState: { errors },
    trigger,
    getValues,
    // setValue,
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
      <Box>123</Box>
    </Modal>
  );
}
