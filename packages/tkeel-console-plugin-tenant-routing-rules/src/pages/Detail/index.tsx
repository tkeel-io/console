import { Box, Flex, Square, Text } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';
import { PingTwoToneIcon } from '@tkeel/console-icons';
// import { DeviceItem } from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import MoreActionButton from '@/tkeel-console-plugin-tenant-routing-rules/components/MoreActionButton';
import RouteLabel, {
  RouteType,
} from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';
import StatusLabel from '@/tkeel-console-plugin-tenant-routing-rules/components/StatusLabel';
import useRuleDetailQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDetailQuery';

import DataRepublish from './components/DataRepublish';
import DataSelect from './components/DataSelect';
import ErrorAction from './components/ErrorAction';
import StepBar from './components/StepBar';
import TextWrapper from './components/TextWrapper';

function getFormattedDateTime(time: string | undefined) {
  return time ? formatDateTimeByTimestamp({ timestamp: `${time}000` }) : '';
}

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: ruleDetail, refetch } = useRuleDetailQuery(id || '');
  const createTime = getFormattedDateTime(ruleDetail?.created_at);
  const updateTime = getFormattedDateTime(ruleDetail?.updated_at);

  let routeType: RouteType = 'msg';
  const type = ruleDetail?.type ?? 1;
  if (type === 2) {
    routeType = 'time';
  }

  const name = ruleDetail?.name ?? '';
  const status = ruleDetail?.status ?? 0;
  const desc = ruleDetail?.desc || '暂无描述';
  const deviceTemplateId = ruleDetail?.model_id ?? '';
  const deviceTemplateName = ruleDetail?.model_name ?? '';

  return (
    <Flex
      marginBottom="20px"
      padding="20px"
      height="100%"
      justifyContent="center"
      position="relative"
      overflowX="hidden"
      overflowY="auto"
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="calc(100% + 40px)"
        height="200px"
        backgroundColor="gray.100"
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
          <Flex alignItems="center" maxWidth="80%">
            <Square size="40px" backgroundColor="gray.50" borderRadius="4px">
              <PingTwoToneIcon size={24} />
            </Square>
            <Text
              marginLeft="8px"
              marginRight="20px"
              color="gray.700"
              fontSize="18px"
              fontWeight="600"
              lineHeight="24px"
              noOfLines={1}
              title={name}
            >
              {name}
            </Text>
            <RouteLabel
              routeType={routeType}
              styles={{ wrapper: { flexShrink: 0 } }}
            />
          </Flex>
          <Flex alignItems="center">
            <StatusLabel
              status={status}
              styles={{ wrapper: { marginRight: '15px' } }}
            />
            <MoreActionButton
              cruxData={{
                id: id || '',
                name,
                status,
                desc,
                type,
                deviceTemplateId,
                deviceTemplateName,
              }}
              refetch={() => {
                refetch();
              }}
              onDeleteSuccess={() => {
                queryClient.invalidateQueries('routeRules');
                navigate('/');
              }}
            />
          </Flex>
        </Flex>
        <TextWrapper
          label="描述"
          value={desc}
          styles={{ wrapper: { marginTop: '8px' } }}
        />
        <Flex marginTop="8px">
          <TextWrapper
            label="创建时间"
            value={createTime}
            styles={{ text: { width: '140px' } }}
          />
          <TextWrapper label="修改时间" value={updateTime} />
        </Flex>
        <StepBar
          ruleStatus={{
            devicesStatus: ruleDetail?.devices_status ?? 0,
            targetStatus: ruleDetail?.targets_status ?? 0,
            subId: ruleDetail?.sub_id ?? 0,
          }}
          styles={{ wrapper: { marginTop: '32px' } }}
        />
        <Flex
          flexDirection="column"
          marginTop="20px"
          padding="20px"
          borderRadius="4px"
          backgroundColor="white"
        >
          <DataSelect routeType={routeType} />
          <DataRepublish
            sx={{ margin: '40px 0' }}
            deviceTemplateId={deviceTemplateId}
            routeType={routeType}
            status={status}
          />
          <ErrorAction
            subscribeId={ruleDetail?.sub_id ?? 0}
            refetchDetail={() => refetch()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
