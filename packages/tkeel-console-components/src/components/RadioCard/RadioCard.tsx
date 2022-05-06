import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';

interface Props extends UseRadioProps {
  style?: CSSProperties;
  children: ReactNode;
}

export default function RadioCard(props: Props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const { style, children } = props;

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderRadius="md"
        color="gray.400"
        cursor="pointer"
        _checked={{
          backgroundColor: 'primarySub',
          color: 'primary',
          borderColor: 'primary',
        }}
        style={style}
      >
        {children}
      </Box>
    </Box>
  );
}
