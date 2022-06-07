import { Box, Button, Flex, Input, StyleProps } from '@chakra-ui/react';
import { HTMLInputTypeAttribute, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { EyeOffTwoToneIcon, EyeTwoToneIcon } from '@tkeel/console-icons';

import FormControl, {
  FormControlProps,
} from '@/tkeel-console-components/components/FormControl';

import { fieldDefaultProps } from './default-props';
import { getFocusStyle } from './utils';

type Props = FormControlProps & {
  id: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  registerReturn?: UseFormRegisterReturn;
  inputStyle?: StyleProps;
  autoComplete?: 'on' | 'off' | 'new-password';
  isTogglePassword?: boolean; // password type only
};

const defaultProps = {
  type: 'text',
  inputStyle: {},
  ...fieldDefaultProps,
};

export default function TextField({
  id,
  type,
  defaultValue,
  value,
  placeholder,
  isDisabled,
  registerReturn,
  inputStyle,
  autoComplete = 'on',
  isTogglePassword = true,
  ...rest
}: Props) {
  const [isPasswordType, setIsPasswordType] = useState(type === 'password');

  const hasTogglePasswordButton = type === 'password' && isTogglePassword;
  const defaultType = hasTogglePasswordButton ? 'text' : type;

  const toggleType = () => setIsPasswordType(!isPasswordType);

  return (
    <FormControl id={id} {...rest}>
      <Box position="relative">
        <Input
          borderColor="gray.200"
          paddingRight={hasTogglePasswordButton ? '44px !important' : ''}
          fontSize="14px"
          boxShadow="none !important"
          _placeholder={{ color: 'blackAlpha.500' }}
          _focus={getFocusStyle(!!rest.error)}
          id={id}
          type={isPasswordType ? 'password' : defaultType}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          isDisabled={isDisabled}
          autoComplete={autoComplete}
          {...registerReturn}
          {...inputStyle}
        />
        {hasTogglePasswordButton && (
          <Flex
            position="absolute"
            top="0"
            right="6px"
            bottom="0"
            alignItems="center"
          >
            <Button
              width="32px"
              height="32px"
              padding="0"
              colorScheme="brand"
              variant="ghost"
              onClick={toggleType}
            >
              {isPasswordType ? (
                <EyeOffTwoToneIcon size="20px" />
              ) : (
                <EyeTwoToneIcon size="20px" />
              )}
            </Button>
          </Flex>
        )}
      </Box>
    </FormControl>
  );
}

TextField.defaultProps = defaultProps;
