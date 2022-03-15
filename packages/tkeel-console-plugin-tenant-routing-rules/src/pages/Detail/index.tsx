import { Box, Flex, Square, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';

import TextWrapper from './TextWrapper';

export default function Detail() {
  const navigate = useNavigate();
  return (
    <Flex
      paddingTop="20px"
      height="100%"
      justifyContent="center"
      position="relative"
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="calc(100% + 20px)"
        height="200px"
        backgroundColor="grayAlternatives.50"
      />
      <BackButton
        position="absolute"
        left="37px"
        top="20px"
        onClick={() => {
          navigate('/');
        }}
      />
      <Flex position="relative" flexDirection="column" width="82%">
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <Square size="40px" backgroundColor="gray.50" />
            <Text
              marginLeft="8px"
              color="gray.700"
              fontSize="18px"
              fontWeight="600"
              lineHeight="24px"
            >
              数据存储方案B
            </Text>
          </Flex>
        </Flex>
        <TextWrapper
          label="描述"
          value="模型说明一句话描述模型说明一句话描述模型说明一句话描述模型说明一句话模型描述明"
          styles={{ wrapper: { marginTop: '8px' } }}
        />
        <Flex marginTop="8px">
          <TextWrapper label="创建时间" value="2021-12-01 13:41" />
          <TextWrapper
            label="修改时间"
            value="2022-03-01 15:15"
            styles={{ wrapper: { marginLeft: '20px' } }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
