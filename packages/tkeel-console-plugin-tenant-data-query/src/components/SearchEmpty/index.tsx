import { Flex, Image, StyleProps, Text } from '@chakra-ui/react';

import searchEmpty from '@/tkeel-console-plugin-tenant-data-query/assets/images/search-empty.svg';

type Props = {
  title?: string;
  styles?: {
    wrapper?: StyleProps;
    image?: StyleProps;
    text?: StyleProps;
  };
};

export default function SearchEmpty({
  styles = {},
  title = '支持关键字搜索，支持设备分组、设备模版搜索',
}: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...styles?.wrapper}
    >
      <Image width="70px" {...styles.image} src={searchEmpty} />
      <Text color="gray.400" fontSize="12px" lineHeight="20px" {...styles.text}>
        {title}
      </Text>
    </Flex>
  );
}
