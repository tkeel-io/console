import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = FlexProps & {
  children: ReactNode;
};

function Index({ children, ...rest }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      h="24px"
      lineHeight="24px"
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default Index;
