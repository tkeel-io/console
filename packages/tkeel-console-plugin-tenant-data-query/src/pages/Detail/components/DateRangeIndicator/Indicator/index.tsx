import { Box, StyleProps } from '@chakra-ui/react';

export default function Indicator(props: StyleProps) {
  return (
    <Box
      position="absolute"
      bottom="-2px"
      width="4px"
      height="8px"
      backgroundColor="primary"
      {...props}
    />
  );
}
