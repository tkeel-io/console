import { CSSProperties, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import EmptyImage from './assets/images/empty.svg?svgr';

export interface Props {
  image?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  styles?: {
    wrapper?: CSSProperties;
    image?: CSSProperties;
    title?: CSSProperties;
    description?: CSSProperties;
    content?: CSSProperties;
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
      style={styles?.wrapper}
    >
      <Box style={styles?.image}>{image}</Box>
      <Box
        marginTop="28px"
        fontSize="18px"
        lineHeight="28px"
        color="gray.800"
        style={styles?.title}
      >
        {title}
      </Box>
      <Box
        marginTop="8px"
        fontSize="14px"
        lineHeight="20px"
        color="gray.500"
        style={styles?.description}
      >
        {description}
      </Box>
      <Box style={styles?.content}>{content}</Box>
    </Box>
  );
}
