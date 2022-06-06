import type { UseRadioProps } from '@chakra-ui/react';
import { Box, chakra, Text, useRadio } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import background from './background.svg';
import backgroundActive from './background-active.svg';

interface Props extends UseRadioProps {
  label: ReactNode;
  val: ReactNode;
}

export type { Props };

export default function Radio({ label, val, ...radioProps }: Props) {
  const res = useRadio(radioProps);
  const { state, getInputProps, getCheckboxProps, htmlProps } = res;
  const { isChecked } = state;
  const inputProps = getInputProps({});

  return (
    <chakra.label {...htmlProps}>
      <input {...inputProps} hidden />
      <Box
        width="200px"
        padding="12px 16px"
        borderRadius="4px"
        border="1px solid"
        borderColor="grayAlternatives.100"
        cursor="pointer"
        backgroundImage={`url(${background})`}
        backgroundRepeat="no-repeat"
        backgroundPosition="right 16px center"
        {...getCheckboxProps()}
        _checked={{
          borderColor: 'transparent',
          backgroundColor: 'primary',
          backgroundImage: `url(${backgroundActive})`,
        }}
        _hover={{ opacity: '0.8' }}
      >
        <Text
          paddingBottom="8px"
          fontWeight="500"
          fontSize="12px"
          lineHeight="20px"
          color={isChecked ? 'rgba(255, 255, 255, 0.8)' : 'gray.600'}
        >
          {label}
        </Text>
        <Text
          fontWeight="700"
          fontSize="16px"
          lineHeight="20px"
          color={isChecked ? 'white' : 'gray.700'}
        >
          {val}
        </Text>
      </Box>
    </chakra.label>
  );
}
