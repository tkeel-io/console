import { Box, StyleProps } from '@chakra-ui/react';

type Props = {
  style: StyleProps;
};

export default function Rectangle({ style }: Props) {
  return (
    <Box
      className="rectangle"
      position="absolute"
      top="8px"
      width="4px"
      height="20px"
      backgroundColor="primary"
      {...style}
    />
  );
}
