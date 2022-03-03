import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  StyleProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface FormControlProps {
  label?: ReactNode;
  help?: ReactNode;
  error?: FieldError;
  formControlStyle?: StyleProps;
  formLabelStyle?: StyleProps;
  formHelperStyle?: StyleProps;
  formErrorMessageStyle?: StyleProps;
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
  formHelperStyle,
  formErrorMessageStyle,
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
        <FormErrorMessage {...formHelperStyle} {...formErrorMessageStyle}>
          {error?.message}
        </FormErrorMessage>
      ) : (
        <FormHelperText {...formHelperStyle}>{help}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomFormControl;
