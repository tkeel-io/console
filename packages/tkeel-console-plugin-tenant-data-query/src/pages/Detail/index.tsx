import { Button, Circle, Flex, Text } from '@chakra-ui/react';

// import { useNavigate } from 'react-router-dom';
import { Checkbox, IconButton, SearchInput } from '@tkeel/console-components';
import {
  BroomFilledIcon,
  ChevronDownFilledIcon,
  DownloadFilledIcon,
  LeftFilledIcon,
  RefreshFilledIcon,
  RightFilledIcon,
  // ChevronUpFilledIcon
} from '@tkeel/console-icons';

import CustomCircle from './components/CustomCircle';
import DataTable from './components/DataTable';
import DeviceDetailCard from './components/DeviceDetailCard';

export default function Detail() {
  // const navigate = useNavigate();

  const columnNames = ['通信故障', 'C相相角', 'B相相角', '频率', '总功率因数'];

  return (
    <Flex height="100%" justifyContent="space-between">
      <Flex flexDirection="column" width="360px">
        <DeviceDetailCard />
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
          <Checkbox marginLeft="20px" height="32px">
            原始数据
          </Checkbox>
          <Flex
            flexDirection="column"
            paddingTop="14px"
            paddingLeft="20px"
            backgroundColor="gray.50"
          >
            <Flex alignItems="center">
              <ChevronDownFilledIcon color="grayAlternatives.300" />
              <Checkbox marginLeft="10px">遥测数据</Checkbox>
            </Flex>
            <Flex
              marginTop="10px"
              flex="1"
              paddingLeft="47px"
              flexDirection="column"
            >
              {columnNames.map((item) => (
                <Checkbox marginBottom="16px" key={item}>
                  {item}
                </Checkbox>
              ))}
            </Flex>
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
        <DataTable style={{ flex: '1', marginTop: '10px' }} />
      </Flex>
    </Flex>
  );
}
