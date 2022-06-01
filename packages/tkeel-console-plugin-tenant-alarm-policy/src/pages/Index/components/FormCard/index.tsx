import { Flex, Grid, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  children: ReactNode;
}

export default function FormCard({ title, children }: Props) {
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
      <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap="12px">
        {children}
      </Grid>
    </Flex>
  );
}
