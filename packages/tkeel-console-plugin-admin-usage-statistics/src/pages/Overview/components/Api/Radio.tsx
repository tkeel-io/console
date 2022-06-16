import type { StyleProps, UseRadioProps } from '@chakra-ui/react';
import { Box, chakra, Flex, Skeleton, useRadio } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { numeral } from '@tkeel/console-utils';

import background from './background.svg';
import backgroundActive from './background-active.svg';

interface Props extends UseRadioProps {
  text: ReactNode;
  content: number;
  convert?: (value: number) => number;
  formatter?: boolean | string;
  isLoading: boolean;
}

const sizeProps: StyleProps = {
  width: '200px',
  height: '74px',
};

export type { Props };

export default function Radio({
  text,
  content,
  convert,
  formatter = true,
  isLoading,
  ...radioProps
}: Props) {
  const res = useRadio(radioProps);
  const { state, getInputProps, getCheckboxProps, htmlProps } = res;
  const { isChecked } = state;
  const inputProps = getInputProps({});

  if (isLoading) {
    return <Skeleton {...sizeProps} />;
  }

  return (
    <chakra.label {...htmlProps}>
      <input {...inputProps} hidden />
      <Flex
        {...sizeProps}
        flexDirection="column"
        justifyContent="center"
        padding="0 16px"
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
        <Box
          paddingBottom="8px"
          fontWeight="500"
          fontSize="12px"
          lineHeight="20px"
          color={isChecked ? 'rgba(255, 255, 255, 0.8)' : 'gray.600'}
        >
          {text}
        </Box>
        <Box
          fontWeight="700"
          fontSize="16px"
          lineHeight="20px"
          color={isChecked ? 'white' : 'gray.700'}
        >
          {numeral.formatReactNode({
            input: typeof convert === 'function' ? convert(content) : content,
            formatter,
          })}
        </Box>
      </Flex>
    </chakra.label>
  );
}
