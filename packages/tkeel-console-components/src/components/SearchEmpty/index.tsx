import { Flex, Image, StyleProps, Text } from '@chakra-ui/react';

import searchEmpty from '@/tkeel-console-components/assets/images/search-empty.svg';

type Props = {
  sx?: StyleProps;
  styles?: {
    wrapper?: StyleProps;
    image?: StyleProps;
    text?: StyleProps;
  };
  title?: string;
};

export default function SearchEmpty({
  sx,
  styles = {},
  title = '没有符合条件的设备',
}: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...styles?.wrapper}
      {...sx}
    >
      <Image width="70px" {...styles.image} src={searchEmpty} />
      <Text
        marginTop="28px"
        color="gray.600"
        fontSize="14px"
        lineHeight="20px"
        {...styles.text}
      >
        {title}
      </Text>
    </Flex>
  );
}
