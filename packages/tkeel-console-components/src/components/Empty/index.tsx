import { Box, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import EmptyImage from './assets/images/empty.svg?svgr';

interface Props {
  type?: 'page' | 'component';
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
  type = 'page',
  image = <EmptyImage />,
  title = '暂无数据',
  description,
  content,
  styles,
}: Props) {
  const typeIsComponent = type === 'component';
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
        marginTop={typeIsComponent ? '0' : '28px'}
        fontSize={typeIsComponent ? '12px' : '16px'}
        lineHeight={typeIsComponent ? '18px' : '28px'}
        color="gray.600"
        {...styles?.title}
      >
        {title}
      </Box>
      <Box
        marginTop="8px"
        fontSize="14px"
        lineHeight="20px"
        color="gray.600"
        {...styles?.description}
      >
        {description}
      </Box>
      <Box {...styles?.content}>{content}</Box>
    </Box>
  );
}
