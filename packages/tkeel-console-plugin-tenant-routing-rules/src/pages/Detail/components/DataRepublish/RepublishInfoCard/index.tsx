import { Box, Flex, HStack, Image, StyleProps, Text } from '@chakra-ui/react';

import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';

import kafkaImg from '@/tkeel-console-plugin-tenant-routing-rules/assets/images/kafka.svg';

import { FormValues as KafkaRepublishInfo } from '../RepublishToKafkaModal';

type Props = {
  info: KafkaRepublishInfo;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function RepublishInfoCard({ info, styles }: Props) {
  return (
    <Flex
      alignItems="center"
      height="83px"
      paddingLeft="16px"
      paddingRight="35px"
      border="1px"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="white"
      {...styles?.wrapper}
    >
      <Box width="5px" height="40px" backgroundColor="success.300" />
      <Image marginLeft="20px" width="95px" src={kafkaImg} />
      <Text
        flex="1"
        marginLeft="200px"
        color="grayAlternatives.700"
        fontSize="14px"
        isTruncated
        title={info.topic}
      >
        主题 Topic：{info.topic}
      </Text>
      <HStack spacing="20px">
        <PencilFilledIcon
          size={20}
          color="grayAlternatives.300"
          style={{ cursor: 'pointer' }}
        />
        <TrashFilledIcon
          size={20}
          color="grayAlternatives.300"
          style={{ cursor: 'pointer' }}
        />
      </HStack>
    </Flex>
  );
}
