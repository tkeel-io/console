import { Text, TextProps } from '@chakra-ui/react';

export default function DataResultTitle(props: TextProps) {
  return (
    <Text
      marginRight="12px"
      color="gray.700"
      fontSize="14px"
      fontWeight="600"
      lineHeight="36px"
      {...props}
    >
      数据结果
    </Text>
  );
}
