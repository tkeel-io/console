import { Box, Image, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import EmptyImage from './assets/images/empty.svg';

interface Props {
  type?: 'page' | 'component';
  image?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  sx?: StyleProps;
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
  image = <Image src={EmptyImage} />,
  title = '暂无数据',
  description,
  content,
  isFullWidth,
  isFullHeight,
  sx,
  styles,
}: Props) {
  const typeIsComponent = type === 'component';

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
      <Box {...styles?.image}>{image}</Box>
      <Box
        marginTop={typeIsComponent ? '0' : '28px'}
        fontSize={typeIsComponent ? '12px' : '14px'}
        lineHeight={typeIsComponent ? '18px' : '28px'}
        color="gray.600"
        {...styles?.title}
      >
        {title}
      </Box>
      <Box
        marginTop="8px"
        fontSize="12px"
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
