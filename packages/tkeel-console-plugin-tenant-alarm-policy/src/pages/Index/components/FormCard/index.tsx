import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  children: ReactNode;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function FormCard({ title, children, styles }: Props) {
  const wrapperStyle = styles?.wrapper ?? {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '12px',
  };

  return (
    <Flex
      marginBottom="12px"
      flexDirection="column"
      padding="20px"
      borderRadius="4px"
      backgroundColor="white"
    >
      {typeof title === 'string' ? (
        <Text
          marginBottom="20px"
          color="gray.800"
          fontSize="16px"
          fontWeight="600"
          lineHeight="20px"
        >
          {title}
        </Text>
      ) : (
        title
      )}
      <Box {...wrapperStyle}>{children}</Box>
    </Flex>
  );
}
