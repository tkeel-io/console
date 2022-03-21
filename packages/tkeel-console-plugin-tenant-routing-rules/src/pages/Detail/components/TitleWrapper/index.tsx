import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function TitleWrapper({
  icon,
  title,
  description,
  styles,
}: Props) {
  return (
    <Box {...styles?.wrapper}>
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
