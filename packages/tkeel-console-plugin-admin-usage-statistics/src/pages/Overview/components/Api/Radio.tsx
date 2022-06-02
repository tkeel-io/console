import type { UseRadioProps } from '@chakra-ui/react';
import { Center, chakra, Text, useRadio } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props extends UseRadioProps {
  label: ReactNode;
  val: ReactNode;
}

export type { Props };

export default function Radio({ label, val, ...radioProps }: Props) {
  const res = useRadio(radioProps);
  const { getInputProps, getCheckboxProps, htmlProps } = res;
  const inputProps = getInputProps({});

  return (
    <chakra.label
      {...htmlProps}
      width="200px"
      height="70px"
      borderRadius="4px"
      border="1px solid"
      borderColor="grayAlternatives.100"
      cursor="pointer"
      as={Center}
    >
      <input {...inputProps} hidden />
      <Center {...getCheckboxProps()} _checked={{}}>
        <Text
          paddingBottom="8px"
          fontWeight="500"
          fontSize="12px"
          lineHeight="20px"
          color="gray.600"
        >
          {label}
        </Text>
        <Text
          fontWeight="700"
          fontSize="16px"
          lineHeight="20px"
          color="gray.700"
        >
          {val}
        </Text>
      </Center>
    </chakra.label>
  );
}
