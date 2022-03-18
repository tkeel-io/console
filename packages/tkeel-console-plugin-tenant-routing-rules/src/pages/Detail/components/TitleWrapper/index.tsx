import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function TitleWrapper({ icon, title, description }: Props) {
  return (
    <Box>
      <Flex alignItems="center">
        {icon}
        <Text
          marginLeft="8px"
          color="gray.800"
          fontSize="18px"
          fontWeight="600"
          lineHeight="32px"
        >
          {title}
        </Text>
      </Flex>
      <Text
        marginTop="4px"
        color="grayAlternatives.300"
        fontSize="12px"
        lineHeight="24px"
      >
        {description}
      </Text>
    </Box>
  );
}
