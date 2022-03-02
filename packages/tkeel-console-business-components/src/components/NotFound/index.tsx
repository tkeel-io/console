import { Center, Text } from '@chakra-ui/react';
import { CSSProperties } from 'react';

import NotFoundImage from './assets/images/not-found.svg?svgr';

type Props = {
  isFullSize?: boolean;
  styles?: {
    wrapper?: CSSProperties;
  };
};

export default function NotFound({ isFullSize = true, styles }: Props) {
  return (
    <Center
      flexDirection="column"
      width={isFullSize ? '100%' : ''}
      height={isFullSize ? '100%' : ''}
      style={styles?.wrapper}
    >
      <NotFoundImage />
      <Text fontWeight="600" fontSize="14px" lineHeight="24px" color="gray.700">
        404 Not Found
      </Text>
    </Center>
  );
}
