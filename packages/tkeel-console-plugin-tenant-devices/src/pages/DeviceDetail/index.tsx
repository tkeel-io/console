import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Colors,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { MoreAction } from '@tkeel/console-components';
import {
  ChevronLeftFilledIcon,
  MessageWarningTwoToneIcon,
  VpcTwoToneIcon,
  WebcamTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

import ConnectionInfo from './Components/ConnectionInfo';
import InitialData from './Components/InitialData';
import { CardContentFlex, InfoCardWrapper } from './index.style';

import {
  CreateDeviceButton,
  CreateDeviceGroupButton,
} from '@/tkeel-console-plugin-tenant-devices/components/buttons';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';

const basicInfo = [
  {
    content: 'a166edbd-1703-4264-8b4f-7a3969a2fd7f',
    title: '设备ID',
  },
  {
    content: 'e-yj-hj-n60',
    title: '设备凭证',
  },
  {
    content: '默认分组',
    title: '设备组',
  },
  {
    content: 1,
    title: '连接方式',
  },
  {
    content: '2020.12.21 12:43:41',
    title: '创建时间',
  },
  {
    content: '2020.12.21 12:43:41',
    title: '更新时间',
  },
  {
    content: '世界顶级卡萨丁姐看打算看加拿大籍',
    title: '描述',
  },
];

interface CustomColor extends Colors {
  primary: string;
}

function Index(): JSX.Element {
  const result = useDeviceDetailQuery();
  const navigate = useNavigate();
  // eslint-disable-next-line no-console
  console.log(result);
  const { colors }: { colors: CustomColor } = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [
    {
      title: '连接信息',
      key: 'connectionInfo',
      component: <ConnectionInfo />,
    },
    {
      title: '原始数据',
      key: 'initialData',
      component: <InitialData />,
    },
  ];

  const status = {
    isConnect: 1,
    isSub: 1,
    isSelfLearn: 0,
  };

  const connectionIcon = [
    <WifiOffFilledIcon key="wifi-off" />,
    <WifiFilledIcon key="wifi" />,
  ];

  const subscribe = [
    {
      color: '#fff',
      twoToneColor: '#79879C',
    },
    {
      color: '#fff',
      twoToneColor: '#31B8B8',
    },
  ];

  const selfLearn = [
    {
      color: '#79879C',
      twoToneColor: '#79879C',
    },
    {
      color: '#2580FF',
      twoToneColor: '#55BC8A',
    },
  ];

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const renderLeftPanel = () => {
    return (
      <VStack spacing="12px" minWidth="360px" flex="1" mr="20px">
        <VStack
          w="100%"
          bg="white"
          p="12px 12px 12px 20px"
          borderRadius="4px"
          spacing="20px"
          align="left"
        >
          <CardContentFlex>
            <Flex
              w="64px"
              h="32px"
              alignItems="center"
              _hover={{
                bg: 'primarySub',
                border: '1px',
                borderColor: 'primarySub',
                borderRadius: '70px',
                color: 'primary',
                '& > svg': {
                  fill: `${colors.primary} !important`,
                },
              }}
            >
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ChevronLeftFilledIcon />}
                onClick={() => {
                  navigate('/');
                }}
              >
                返回
              </Button>
            </Flex>
            <Box>
              <MoreAction
                buttons={[
                  <CreateDeviceButton key="device" />,
                  <CreateDeviceGroupButton key="device-group" />,
                ]}
              />
            </Box>
          </CardContentFlex>
          <CardContentFlex>
            <Box display="flex">
              <WebcamTwoToneIcon size="24px" />
              <Box as="span" fontSize="14px" fontWeight={600} ml="8px">
                OPC协议设备
              </Box>
            </Box>
            <Flex flex={1} justifyContent="flex-end">
              <Flex
                w="24px"
                h="24px"
                justifyContent="center"
                alignItems="center"
                borderRadius="4px"
                ml="4px"
                bg={status.isConnect ? '#E8F7F7' : '#79879C'}
              >
                {connectionIcon[status.isConnect]}
              </Flex>
              <Flex
                w="24px"
                h="24px"
                justifyContent="center"
                alignItems="center"
                borderRadius="4px"
                ml="4px"
                bg={status.isSub ? '#E8F7F7' : '#79879C'}
              >
                <MessageWarningTwoToneIcon
                  color={subscribe[status.isSub].color}
                  twoToneColor={subscribe[status.isSub].twoToneColor}
                />
              </Flex>
              <Flex
                w="24px"
                h="24px"
                justifyContent="center"
                alignItems="center"
                borderRadius="4px"
                ml="4px"
                bg={status.isSelfLearn ? '#E9F2FF' : '#EFF4F9'}
                css={css`
                  .vpc-icon-control {
                    path {
                      &:first-child {
                        fill: ${selfLearn[status.isSelfLearn].color};
                      }

                      &:last-child {
                        fill: ${selfLearn[status.isSelfLearn].twoToneColor};
                      }
                    }
                  }
                `}
              >
                <VpcTwoToneIcon className="vpc-icon-control" />
              </Flex>
            </Flex>
          </CardContentFlex>
          <HStack spacing="26px" fontSize="12px">
            <Text h="39px" lineHeight="39px">
              订阅地址
            </Text>
            <Text h="39px" lineHeight="39px" fontWeight={400}>
              pubsub://client-pubsub/core-pub
            </Text>
          </HStack>
        </VStack>
        <InfoCardWrapper>
          <Text
            fontSize="14px"
            fontWeight={600}
            h="20px"
            lineHeight="20px"
            mb="12px"
          >
            基本信息
          </Text>
          <VStack spacing="4px">
            {basicInfo.map((r) => {
              return (
                <Flex key={r.title} w="100%" fontSize="12px">
                  <Text
                    minWidth="48px"
                    h="24px"
                    lineHeight="24px"
                    mr="26px"
                    color="grayAlternatives.300"
                  >
                    {r.title}
                  </Text>
                  <Text
                    h="20px"
                    lineHeight="24px"
                    color="gray.800"
                    fontWeight={400}
                  >
                    {r.content}
                  </Text>
                </Flex>
              );
            })}
          </VStack>
        </InfoCardWrapper>
        <InfoCardWrapper>
          <Text fontSize="14px" fontWeight={600} mb="12px">
            扩展信息
          </Text>
          <Flex fontSize="12px">
            <Text
              minWidth="48px"
              h="24px"
              lineHeight="24px"
              mr="26px"
              color="grayAlternatives.300"
            >
              厂商
            </Text>
            <Text h="20px" lineHeight="24px" color="gray.800" fontWeight={400}>
              青云
            </Text>
          </Flex>
          <Flex fontSize="12px">
            <Text
              minWidth="48px"
              h="24px"
              lineHeight="24px"
              mr="26px"
              color="grayAlternatives.300"
            >
              硬件版本
            </Text>
            <Text h="20px" lineHeight="24px" color="gray.800" fontWeight={400}>
              硬件版本：v1.1.1
            </Text>
          </Flex>
        </InfoCardWrapper>
      </VStack>
    );
  };

  const renderRightPanel = () => {
    return (
      <Box minWidth="700px" flex="2.67" bg="white" borderRadius="4px">
        <Tabs variant="unstyled" index={tabIndex} onChange={handleTabChange}>
          <TabList
            bg="gray.700"
            color="white"
            borderRadius={tabIndex === 0 ? '4px 4px 0 0' : '0 4px 0 0'}
          >
            {tabs.map((r) => (
              <Tab
                key={r.key}
                _selected={{
                  color: 'white',
                  bg: 'primary',
                  borderRadius: `${tabIndex === 0 ? '4px' : 0} 0 0 0`,
                  boxShadow: 'none',
                }}
                fontSize="12px"
                fontWeight={600}
                borderRight="1px"
                borderColor="gray.600"
              >
                {r.title}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((r) => (
              <TabPanel key={r.key}>{r.component}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    );
  };

  return (
    <Flex justifyContent="space-between">
      {renderLeftPanel()}
      {renderRightPanel()}
    </Flex>
  );
}

export default Index;
