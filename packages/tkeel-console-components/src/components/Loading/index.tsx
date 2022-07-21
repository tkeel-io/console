import { Box, Spinner, SpinnerProps, StyleProps } from '@chakra-ui/react';

interface Props extends SpinnerProps {
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  sx?: StyleProps;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function Loading({
  isFullWidth,
  isFullHeight,
  sx,
  styles,
  ...rest
}: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={isFullWidth ? '100%' : ''}
      height={isFullHeight ? '100%' : ''}
      {...styles?.wrapper}
      {...sx}
    >
      <Spinner {...rest} />
    </Box>
  );
}
