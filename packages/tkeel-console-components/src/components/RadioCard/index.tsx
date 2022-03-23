import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

// interface Props extends UseRadioProps {
//   children: ReactNode;
// }

function RadioCard(props: UseRadioProps & { children: ReactNode }) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const { children } = props;
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        width="auto"
        height="28px"
        color="gray.400"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        padding="0 20px"
        _checked={{
          bg: 'primarySub',
          color: 'primary',
          borderColor: 'primary',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  );
}

export default RadioCard;
