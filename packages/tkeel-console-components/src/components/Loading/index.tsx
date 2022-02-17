import { Box, Spinner, SpinnerProps, StyleProps } from '@chakra-ui/react';

interface Props extends SpinnerProps {
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function Loading({ styles, ...rest }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...styles?.wrapper}
    >
      <Spinner {...rest} />
    </Box>
  );
}
