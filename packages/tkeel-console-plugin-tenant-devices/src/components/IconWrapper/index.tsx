import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = FlexProps & {
  iconBg: string;
  children: ReactNode;
};

function IconWrapper({ iconBg, children, ...rest }: Props) {
  return (
    <Flex
      bg={iconBg}
      alignItems="center"
      justifyContent="center"
      h="24px"
      p="4px 4px"
      borderRadius="4px"
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default IconWrapper;
