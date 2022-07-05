import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  StyleProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError, Merge } from 'react-hook-form';

export interface FormControlProps {
  label?: ReactNode;
  help?: ReactNode;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
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
      {label && (
        <FormLabel
          htmlFor={id}
          color="gray.600"
          fontSize="14px"
          lineHeight="24px"
          {...formLabelStyle}
        >
          {label}
        </FormLabel>
      )}
      {children}
      {(() => {
        if (error?.message) {
          return (
            <FormErrorMessage {...formHelperStyle} {...formErrorMessageStyle}>
              {error?.message}
            </FormErrorMessage>
          );
        }

        if (help) {
          return <FormHelperText {...formHelperStyle}>{help}</FormHelperText>;
        }

        return null;
      })()}
    </FormControl>
  );
}

export default CustomFormControl;
