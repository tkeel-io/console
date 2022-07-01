import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

const { TextField } = FormField;

interface Props {
  id: string;
  title: string;
  description?: string;
  type: 'text' | 'number';
  isDisabled?: boolean;
  error?: FieldError;
  registerReturn: UseFormRegisterReturn;
}

export type { Props };

export default function Input({
  id,
  title,
  description = '',
  type,
  isDisabled,
  error,
  registerReturn,
}: Props) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      borderRadius="4px"
      height="120px"
      padding="12px 20px 0"
      backgroundColor="gray.50"
    >
      <TextField
        id={id}
        type={type}
        label={
          <Flex alignItems="center">
            <Text noOfLines={1}>
              <Tooltip label={title}>
                <Text
                  as="span"
                  fontWeight="500"
                  fontSize="14px"
                  lineHeight="24px"
                  color="gray.700"
                >
                  {title}
                </Text>
              </Tooltip>
            </Text>
            {description && (
              <Text flex="1" minWidth="100px" marginLeft="8px" noOfLines={1}>
                <Tooltip label={description}>
                  <Text
                    as="span"
                    fontSize="12px"
                    lineHeight="24px"
                    color="grayAlternatives.400"
                  >
                    {description}
                  </Text>
                </Tooltip>
              </Text>
            )}
          </Flex>
        }
        isDisabled={isDisabled}
        error={error}
        registerReturn={registerReturn}
        formControlStyle={{ marginBottom: '0' }}
        inputStyle={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}
