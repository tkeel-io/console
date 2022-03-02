import { Box, Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Loading } from '@tkeel/console-components';

type Props = {
  loading: boolean;
  content: ReactNode;
};

export default function ListWrapper({ loading, content }: Props) {
  return (
    <Box flex="1" overflow="auto">
      {loading ? (
        <Center height="200px">
          <Loading />
        </Center>
      ) : (
        content
      )}
    </Box>
  );
}
