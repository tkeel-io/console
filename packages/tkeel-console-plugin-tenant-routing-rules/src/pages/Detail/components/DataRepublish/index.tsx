import { Flex, HStack, StyleProps, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Tooltip } from '@tkeel/console-components';
import {
  AutoFilledIcon,
  KafkaFilledIcon,
  ObjectStorageFilledIcon,
} from '@tkeel/console-icons';

import ProductTab from '../ProductTab';
import TitleWrapper from '../TitleWrapper';
import RepublishInfoCard from './RepublishInfoCard';
import RepublishToKafkaModal from './RepublishToKafkaModal';

type Props = {
  styles?: { wrapper: StyleProps };
};

export default function DataRepublish({ styles }: Props) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [publishInfoList] = useState<{ address: string; topic: string }[]>([
    {
      address: '',
      topic: 'test',
    },
  ]);

  const iconColor = 'grayAlternatives.300';
  const products = [
    {
      id: 'kafka',
      icon: <KafkaFilledIcon size={22} color={iconColor} />,
      name: 'Kafka',
      disable: false,
    },
    {
      id: 'objectStorage',
      icon: <ObjectStorageFilledIcon size={22} color={iconColor} />,
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
        <HStack marginTop="8px" spacing="8px">
          {products.map((product) => {
            const { id, icon, name, disable } = product;
            return (
              <Tooltip key={id} label={disable ? '敬请期待' : ''}>
                <ProductTab
                  name={name}
                  icon={icon}
                  disable={disable}
                  onClick={() => {
                    setSelectedProductId(id);
                  }}
                />
              </Tooltip>
            );
          })}
        </HStack>
        {publishInfoList.map((info, i) => (
          <RepublishInfoCard
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            info={info}
            styles={{ wrapper: { marginTop: '20px' } }}
          />
        ))}
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
