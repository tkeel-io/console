import { Flex, Image, StyleProps, Text } from '@chakra-ui/react';

import noDataSvg from '@/tkeel-console-components/assets/images/no-data.svg';

type Props = {
  title?: string;
  style?: StyleProps;
};

export default function NoData({
  title = '暂无设备,请重新选择',
  style,
}: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="120px"
      {...style}
    >
      <Image width="70px" src={noDataSvg} />
      <Text marginTop="4px" color="gray.600" fontSize="12px" lineHeight="24px">
        {title}
      </Text>
    </Flex>
  );
}
