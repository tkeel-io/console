import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  title: string;
  desc: string;
  children: ReactNode;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function ConfigCard({ title, desc, children, styles }: Props) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="20px 28px 20px 24px"
      borderRadius="2px"
      backgroundColor="white"
      {...styles?.wrapper}
    >
      <Box lineHeight="20px">
        <Text color="gray.800" fontSize="14px" fontWeight="500">
          {title}
        </Text>
        <Text color="gray.500" fontSize="12px">
          {desc}
        </Text>
      </Box>
      {children}
    </Flex>
  );
}
