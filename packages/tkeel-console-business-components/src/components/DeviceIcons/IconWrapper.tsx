import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = FlexProps & {
  children: ReactNode;
};

function IconWrapper({ children, ...rest }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w="24px"
      h="24px"
      borderRadius="4px"
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default IconWrapper;
