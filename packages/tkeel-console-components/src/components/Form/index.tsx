import { Box, BoxProps } from '@chakra-ui/react';
import { FormEventHandler } from 'react';

type Props = BoxProps & {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function Form({ onSubmit, children, ...boxProps }: Props) {
  return (
    // @ts-ignore
    <Box as="form" margin="0" {...boxProps} onSubmit={onSubmit}>
      {children}
    </Box>
  );
}

export default Form;
