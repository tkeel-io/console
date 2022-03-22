import { Box, Flex, Square, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';
import { PingTwoToneIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

import DataRepublish from './components/DataRepublish';
import DataSelect from './components/DataSelect';
import ErrorAction from './components/ErrorAction';
import StepBar, { CurrentStep } from './components/StepBar';
import TextWrapper from './components/TextWrapper';

export default function Detail() {
  const navigate = useNavigate();
  const [currentStep] = useState<CurrentStep>(1);
  const [deviceList, setDeviceList] = useState<DeviceItem[]>([]);

  return (
    <Flex
      paddingTop="20px"
      height="100%"
      justifyContent="center"
      position="relative"
      overflowX="hidden"
      overflowY="auto"
    >
      <Box
        position="absolute"
        left="-20px"
        top="0"
        width="calc(100% + 40px)"
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
            <Square size="40px" backgroundColor="gray.50" borderRadius="4px">
              <PingTwoToneIcon size={20} />
            </Square>
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
        <StepBar
          currentStep={currentStep}
          styles={{ wrapper: { marginTop: '32px' } }}
        />
        <Flex
          flexDirection="column"
          marginTop="20px"
          padding="20px"
          borderRadius="4px"
          backgroundColor="white"
        >
          <DataSelect
            deviceList={deviceList}
            handleSelectDevices={(devices) => setDeviceList(devices)}
          />
          <DataRepublish styles={{ wrapper: { margin: '40px 0' } }} />
          <ErrorAction />
        </Flex>
      </Flex>
    </Flex>
  );
}
