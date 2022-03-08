import { Box, Button, Circle, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Checkbox,
  IconButton,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
import {
  BroomFilledIcon,
  // ChevronDownFilledIcon,
  DownloadFilledIcon,
  LeftFilledIcon,
  RefreshFilledIcon,
  RightFilledIcon,
  // ChevronUpFilledIcon
} from '@tkeel/console-icons';

import useTelemetryDataMutation from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useTelemetryDataMutation';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

import CustomCircle from './components/CustomCircle';
import DataTable from './components/DataTable';
import DateRangeIndicator from './components/DateRangeIndicator';
import DeviceDetailCard from './components/DeviceDetailCard';

export default function Detail() {
  const [templateChecked, setTemplateChecked] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [startTime] = useState(1_646_661_655_601);
  const [endTime] = useState(1_646_661_691_686);
  const [rangeStartTime, setRangeStartTime] = useState(startTime);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { deviceObject } = useDeviceDetailQuery({ id });
  const telemetry = deviceObject?.configs?.telemetry ?? {};
  const telemetryKeys = Object.keys(telemetry);

  const children = telemetryKeys.map((key) => ({
    title: telemetry[key].name,
    id: telemetry[key].id,
    key: telemetry[key].id,
  }));

  const treeData = [
    {
      title: '遥测数据',
      id: 'telemetryData',
      key: 'telemetryData',
      children,
    },
  ];

  const identifiers = checkedKeys.join(',');

  const {
    mutate,
    data,
    isSuccess: isTelemetryDataSuccess,
    isLoading: isTelemetryDataLoading,
  } = useTelemetryDataMutation();
  // eslint-disable-next-line no-console
  console.log('Detail ~ data', data);

  const handleExportData = () => {
    if (isTelemetryDataSuccess) {
      window.open(
        `http://192.168.123.9:30707/apis/core/v1/ts/${id}?start_time=${startTime}&end_time=${endTime}&identifiers=${identifiers}`
      );
    }
  };

  return (
    <Flex height="100%" justifyContent="space-between">
      <Flex flexDirection="column" width="360px">
        <DeviceDetailCard detailData={deviceObject} />
        <Flex
          flexDirection="column"
          flex="1"
          marginTop="12px"
          borderRadius="4px"
          backgroundColor="white"
        >
          <Flex
            padding="8px 20px 0"
            justifyContent="space-between"
            alignItems="center"
            fontSize="12px"
            lineHeight="24px"
          >
            <Text color="gray.800" fontWeight="500">
              属性条件
            </Text>
            <Flex alignItems="center" cursor="pointer">
              <BroomFilledIcon color="grayAlternatives.300" />
              <Text marginLeft="6px" color="grayAlternatives.300">
                清空
              </Text>
            </Flex>
          </Flex>
          <SearchInput
            inputGroupStyle={{ margin: '8px 20px 12px' }}
            onSearch={() => {}}
          />
          <Checkbox
            marginLeft="20px"
            height="32px"
            onChange={(e) => {
              const { checked } = e.target;
              setCheckedKeys(checked ? telemetryKeys : []);
              setTemplateChecked(checked);
            }}
            isChecked={templateChecked}
          >
            模板数据
          </Checkbox>
          {/* <Flex marginLeft="20px" height="32px">
            <Box width="16px" height="16px" />
            <Text>模板数据</Text>
          </Flex> */}
          <Box
            // flexDirection="column"
            flex="1"
            paddingTop="14px"
            paddingLeft="20px"
            backgroundColor="gray.50"
          >
            <Tree
              treeData={treeData}
              checkable
              checkedKeys={checkedKeys}
              selectable={false}
              onCheck={(keys) => {
                const checkedNodeKeys = (keys as string[]).filter(
                  (key) => key !== 'telemetryData'
                );
                setCheckedKeys(checkedNodeKeys);
                const templateCheckBoxChecked =
                  checkedNodeKeys.length === telemetryKeys.length;
                setTemplateChecked(templateCheckBoxChecked);
              }}
            />
            {/* <Flex alignItems="center">
              <ChevronDownFilledIcon color="grayAlternatives.300" />
              <Checkbox marginLeft="10px">遥测数据</Checkbox>
            </Flex>
            <Flex
              marginTop="10px"
              flex="1"
              paddingLeft="47px"
              flexDirection="column"
            >
              {Object.keys(telemetry).map((key) => (
                <Checkbox marginBottom="16px" key={telemetry[key].id}>
                  {telemetry[key].name}
                </Checkbox>
              ))}
            </Flex> */}
          </Box>
          <Button
            colorScheme="primary"
            margin="12px 20px"
            disabled={checkedKeys.length === 0}
            isLoading={isTelemetryDataLoading}
            onClick={() => {
              mutate({
                url: `core/v1/ts/${id}`,
                data: {
                  start_time: startTime,
                  end_time: endTime,
                  identifiers,
                  page_size: 10,
                  page_num: 1,
                },
              });
            }}
          >
            确定
          </Button>
        </Flex>
      </Flex>
      <Flex
        marginLeft="12px"
        padding="12px 20px"
        flex="1"
        overflow="hidden"
        flexDirection="column"
        borderRadius="4px"
        backgroundColor="white"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text
              marginRight="12px"
              color="gray.700"
              fontSize="14px"
              fontWeight="600"
              lineHeight="32px"
            >
              数据结果
            </Text>
            <Flex>时间选择器</Flex>
          </Flex>
          <Flex alignItems="center">
            <Circle
              size="32px"
              marginRight="5px"
              backgroundColor="gray.100"
              cursor="pointer"
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('刷新');
              }}
            >
              <RefreshFilledIcon color="grayAlternatives.300" />
            </Circle>
            <IconButton
              paddingLeft="4px"
              paddingRight="16px"
              icon={<DownloadFilledIcon size={14} />}
              isShowCircle
              disabled={!isTelemetryDataSuccess}
              // isLoading={isExportDataLoading}
              onClick={handleExportData}
            >
              数据导出
            </IconButton>
          </Flex>
        </Flex>
        <Flex
          marginTop="12px"
          marginBottom="8px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="12px">遥测数据</Text>
          <Flex>
            <CustomCircle
              onClick={() => {
                if (rangeStartTime - startTime >= 5000) {
                  setRangeStartTime(rangeStartTime - 5000);
                }
              }}
            >
              <LeftFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
            <CustomCircle
              marginLeft="8px"
              onClick={() => {
                if (rangeStartTime + 5000 <= endTime) {
                  setRangeStartTime(rangeStartTime + 5000);
                }
              }}
            >
              <RightFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
          </Flex>
        </Flex>
        <DateRangeIndicator
          startTime={startTime}
          endTime={endTime}
          rangeStartTime={rangeStartTime}
        />
        <DataTable style={{ flex: '1', marginTop: '10px' }} />
      </Flex>
    </Flex>
  );
}
