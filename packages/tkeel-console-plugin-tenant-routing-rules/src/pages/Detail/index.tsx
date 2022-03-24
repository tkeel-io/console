import { Box, Flex, Square, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';
import { PingTwoToneIcon } from '@tkeel/console-icons';
// import { DeviceItem } from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import RouteLabel from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';
import StatusLabel from '@/tkeel-console-plugin-tenant-routing-rules/components/StatusLabel';
import useRuleDetailQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDetailQuery';

import DataRepublish from './components/DataRepublish';
import DataSelect from './components/DataSelect';
import ErrorAction from './components/ErrorAction';
import StepBar, { CurrentStep } from './components/StepBar';
import TextWrapper from './components/TextWrapper';

function getFormattedDateTime(time: string | undefined) {
  return time ? formatDateTimeByTimestamp({ timestamp: `${time}000` }) : '';
}

export default function Detail() {
  const navigate = useNavigate();
  const [currentStep] = useState<CurrentStep>(1);
  // const [deviceList, setDeviceList] = useState<DeviceItem[]>([]);
  const { id } = useParams();
  const { data: ruleDetail } = useRuleDetailQuery(id || '');
  const createTime = getFormattedDateTime(ruleDetail?.created_at);
  const updateTime = getFormattedDateTime(ruleDetail?.updated_at);

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
              marginRight="20px"
              color="gray.700"
              fontSize="18px"
              fontWeight="600"
              lineHeight="24px"
            >
              {ruleDetail?.name ?? ''}
            </Text>
            <RouteLabel routeType="msg" />
          </Flex>
          <Flex>
            <StatusLabel status={0} />
          </Flex>
        </Flex>
        <TextWrapper
          label="描述"
          value={ruleDetail?.desc ?? ''}
          styles={{ wrapper: { marginTop: '8px' } }}
        />
        <Flex marginTop="8px">
          <TextWrapper label="创建时间" value={createTime} />
          <TextWrapper
            label="修改时间"
            value={updateTime}
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
          // deviceList={deviceList}
          // handleSelectDevices={(devices) => setDeviceList(devices)}
          />
          <DataRepublish styles={{ wrapper: { margin: '40px 0' } }} />
          <ErrorAction />
        </Flex>
      </Flex>
    </Flex>
  );
}
