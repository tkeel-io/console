import { ReactNode } from 'react';
import { Box, StyleProps } from '@chakra-ui/react';

import EmptyImage from './assets/images/empty.svg?svgr';

interface Props {
  image?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  styles?: {
    wrapper?: StyleProps;
    image?: StyleProps;
    title?: StyleProps;
    description?: StyleProps;
    content?: StyleProps;
  };
}

export default function Empty({
  image = <EmptyImage />,
  title = '暂无数据',
  description,
  content,
  styles,
}: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...styles?.wrapper}
    >
      <Box {...styles?.image}>{image}</Box>
      <Box
        marginTop="28px"
        fontSize="18px"
        lineHeight="28px"
        color="gray.800"
        {...styles?.title}
      >
        {title}
      </Box>
      <Box
        marginTop="8px"
        fontSize="14px"
        lineHeight="20px"
        color="gray.500"
        {...styles?.description}
      >
        {description}
      </Box>
      <Box {...styles?.content}>{content}</Box>
    </Box>
  );
}
