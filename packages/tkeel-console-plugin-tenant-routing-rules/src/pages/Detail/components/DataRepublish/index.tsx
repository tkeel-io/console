import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  AutoFilledIcon,
  KafkaFilledIcon,
  ObjectStorageFilledIcon,
} from '@tkeel/console-icons';

import TitleWrapper from '../TitleWrapper';
import RepublishToKafkaModal from './RepublishToKafkaModal';

type Props = {
  styles?: { wrapper: StyleProps };
};

export default function DataRepublish({ styles }: Props) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const iconColor = 'grayAlternatives.300';
  const products = [
    {
      id: 'kafka',
      icon: <KafkaFilledIcon color={iconColor} />,
      name: 'Kafka',
      disable: false,
    },
    {
      id: 'objectStorage',
      icon: <ObjectStorageFilledIcon color={iconColor} />,
      name: '对象存储',
      disable: true,
    },
  ];
  return (
    <Flex flexDirection="column" {...styles?.wrapper}>
      <TitleWrapper
        icon={<AutoFilledIcon color={iconColor} size="20px" />}
        title="选择转发"
        description="选择其它云产品转发处理之后的数据"
      />
      <Flex
        marginTop="20px"
        flexDirection="column"
        padding="20px"
        borderRadius="4px"
        backgroundColor="gray.100"
      >
        <Text color="grayAlternatives.500" fontSize="14px" lineHeight="24px">
          请添加相关产品转发数据
        </Text>
        <Flex marginTop="8px" alignItems="center">
          {products.map((product) => {
            const { id, icon, name, disable } = product;
            return (
              <Flex
                key={id}
                marginRight="8px"
                justifyContent="center"
                alignItems="center"
                width="200px"
                height="44px"
                border="1px"
                borderColor="gray.200"
                borderRadius="4px"
                backgroundColor="white"
                opacity={disable ? '0.5' : '1'}
                cursor={disable ? 'not-allowed' : 'pointer'}
                onClick={() => {
                  if (!disable) {
                    setSelectedProductId(id);
                  }
                }}
              >
                {icon}
                <Text
                  marginLeft="10px"
                  color="grayAlternatives.500"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="24px"
                >
                  {name}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      {selectedProductId === 'kafka' && (
        <RepublishToKafkaModal
          isOpen
          onClose={() => setSelectedProductId('')}
        />
      )}
    </Flex>
  );
}
