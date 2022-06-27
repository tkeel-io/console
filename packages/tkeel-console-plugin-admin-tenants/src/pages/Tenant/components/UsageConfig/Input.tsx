import { Box } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

const { TextField } = FormField;

interface Props {
  id: string;
  type: 'text' | 'number';
  defaultValue?: string | number;
  value?: string | number;
  isDisabled?: boolean;
  registerReturn: UseFormRegisterReturn;
}

export type { Props };

export default function Input({
  id,
  type,
  defaultValue = '',
  value = '',
  isDisabled,
  registerReturn,
}: Props) {
  return (
    <Box>
      <TextField
        id={id}
        type={type}
        defaultValue={String(defaultValue)}
        value={String(value)}
        isDisabled={isDisabled}
        registerReturn={registerReturn}
      />
    </Box>
  );
}
