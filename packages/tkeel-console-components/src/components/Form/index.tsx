import { Box, BoxProps } from '@chakra-ui/react';
import { FormEventHandler } from 'react';

type Props = BoxProps & {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function Form({ onSubmit, children, ...boxProps }: Props) {
  return (
    // @ts-ignore
    <Box {...boxProps} as="form" onSubmit={onSubmit}>
      {children}
    </Box>
  );
}

export default Form;
