import { useState } from 'react';
import {
  Box,
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
import {
  ChevronLeftFilledIcon,
  DocumentPencilTowToneIcon,
} from '@tkeel/console-icons';

import ConnectionInfo from './Components/ConnectionInfo';
import InitialData from './Components/InitialData';

const styleProps = {
  w: '100%',
  bg: 'white',
  p: '12px 12px 12px 20px',
  borderRadius: '4px',
};

const centerFlex = {
  justifyContent: 'space-between',
  alignItems: 'center',
  w: '100%',
  h: '24px',
  lineHeight: '24px',
};

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

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const renderLeftPanel = () => {
    return (
      <VStack spacing="12px" minWidth="360px" flex="1" mr="20px">
        <VStack {...styleProps} spacing="20px" align="left">
          <Flex {...centerFlex}>
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
              <ChevronLeftFilledIcon size="16px" />
              <Box as="span" ml="4px" fontWeight="600">
                返回
              </Box>
            </Flex>
            <Box>MoreAction</Box>
          </Flex>
          <Flex {...centerFlex}>
            <Box display="flex">
              <DocumentPencilTowToneIcon size="24px" />
              <Box as="span" fontSize="14px" fontWeight="600" ml="8px">
                OPC协议设备
              </Box>
            </Box>
            <Box />
          </Flex>
          <HStack spacing="26px" fontSize="12px">
            <Text h="39px" lineHeight="39px">
              订阅地址
            </Text>
            <Text h="39px" lineHeight="39px" fontWeight="400">
              pubsub://client-pubsub/core-pub
            </Text>
          </HStack>
        </VStack>
        <Box {...styleProps}>
          <Text
            fontSize="14px"
            fontWeight="600"
            height="20px"
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
                    fontWeight="400"
                  >
                    {r.content}
                  </Text>
                </Flex>
              );
            })}
          </VStack>
        </Box>
        <Box {...styleProps}>
          <Text fontSize="14px" fontWeight="600" mb="12px">
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
            <Text h="20px" lineHeight="24px" color="gray.800" fontWeight="400">
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
            <Text h="20px" lineHeight="24px" color="gray.800" fontWeight="400">
              硬件版本：v1.1.1
            </Text>
          </Flex>
        </Box>
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
