import { Box, Text } from '@chakra-ui/react';

export interface Props {
  title: string;
  description: string;
  isSelected: boolean;
}

export default function AuthTypeOption(props: Props) {
  const { title, description, isSelected } = props;
  return (
    <Box
      minH="84px"
      p="12px 20px"
      cursor="pointer"
      border="2px"
      bg={isSelected ? 'blue.50' : 'white'}
      borderRadius="4px"
      borderColor={isSelected ? 'primary' : 'gray.200'}
    >
      <Text mb="4px" color="black" fontSize="14px" lineHeight="24px">
        {title}
      </Text>
      <Text color="gray.500" fontSize="12px">
        {description}
      </Text>
    </Box>
  );
}
