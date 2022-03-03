import { Box, Button, Circle, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
  BackButton,
  Checkbox,
  IconButton,
  SearchInput,
} from '@tkeel/console-components';
import {
  BroomFilledIcon,
  DownloadFilledIcon,
  LeftFilledIcon,
  RefreshFilledIcon,
  RightFilledIcon,
  VpcTwoToneIcon,
} from '@tkeel/console-icons';

import {
  DeviceIconName,
  DeviceStatusIcon,
  Rectangle,
} from '@/tkeel-console-plugin-tenant-data-query/components';

import CustomCircle from './components/CustomCircle';
// import DataTable from './components/DataTable';

export default function Detail() {
  const navigate = useNavigate();

  const textStyle = {
    color: 'gray.800',
    fontSize: '12px',
    lineHeight: '24px',
  };

  return (
    <Flex height="100%" justifyContent="space-between">
      <Flex flexDirection="column" width="360px">
        <Box borderRadius="4px" backgroundColor="white">
          <Box
            padding="12px 20px 12px 12px"
            height="92px"
            backgroundColor="gray.50"
          >
            <BackButton onClick={() => navigate('/')} />
            <Flex
              marginTop="12px"
              paddingLeft="8px"
              justifyContent="space-between"
              alignItems="center"
            >
              <DeviceIconName />
              <Flex>
                <DeviceStatusIcon isOnline />
                <Rectangle
                  icon={
                    <VpcTwoToneIcon color="primary" twoToneColor="primary" />
                  }
                  backgroundColor="primarySub"
                  style={{ marginLeft: '8px' }}
                />
              </Flex>
            </Flex>
          </Box>
          <Flex
            padding="0 20px"
            justifyContent="space-between"
            alignItems="center"
            height="48px"
          >
            <Text {...textStyle}>IDC分组1</Text>
            <Text {...textStyle}>SIC电表</Text>
          </Flex>
        </Box>
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
          <Checkbox marginLeft="20px">原始数据</Checkbox>
          <Flex
            marginTop="10px"
            flex="1"
            padding="14px 20px"
            flexDirection="column"
            backgroundColor="gray.50"
          >
            <Checkbox>上行消息</Checkbox>
            <Checkbox margin="16px 0">下行消息</Checkbox>
            <Checkbox>连接信息</Checkbox>
          </Flex>
          <Button colorScheme="primary" margin="12px 20px">
            确定
          </Button>
        </Flex>
      </Flex>
      <Flex
        marginLeft="12px"
        padding="12px 20px"
        flex="1"
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
              icon={<DownloadFilledIcon />}
              isShowCircle
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('数据导出');
              }}
            >
              数据导出
            </IconButton>
          </Flex>
        </Flex>
        <Flex
          marginTop="12px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>遥测数据</Text>
          <Flex>
            <CustomCircle>
              <LeftFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
            <CustomCircle marginLeft="8px">
              <RightFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
          </Flex>
        </Flex>
        {/* <DataTable style={{ flex: '1' }} /> */}
      </Flex>
    </Flex>
  );
}
