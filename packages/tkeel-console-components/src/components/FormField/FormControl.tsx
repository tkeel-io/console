import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  StyleProps,
} from '@chakra-ui/react';

export interface FormControlProps {
  label: string;
  help: string;
  error: FieldError;
  formControlStyle: StyleProps;
  formLabelStyle: StyleProps;
}

type Props = FormControlProps & {
  id: string;
  children: ReactNode;
};

function CustomFormControl({
  id,
  label,
  help,
  error,
  formControlStyle,
  formLabelStyle,
  children,
}: Props) {
  return (
    <FormControl
      marginBottom="16px"
      id={id}
      {...formControlStyle}
      isInvalid={!!error}
    >
      <FormLabel
        htmlFor={id}
        color="gray.600"
        fontSize="14px"
        lineHeight="24px"
        {...formLabelStyle}
      >
        {label}
      </FormLabel>
      {children}
      {error ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        <FormHelperText>{help}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomFormControl;
