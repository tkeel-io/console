import {
  Flex,
  StyleProps,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BasicInfoBg } from '@tkeel/console-business-components';
import {
  BackButton,
  CustomTab,
  CustomTabList,
} from '@tkeel/console-components';
import { AppsRhombusTwoToneIcon } from '@tkeel/console-icons';

export default function ThemeColorConfig() {
  const navigate = useNavigate();
  const labelStyle: StyleProps = {
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '600',
  };

  const descStyle: StyleProps = {
    color: 'gray.500',
    fontSize: '12px',
  };

  return (
    <Flex flex="1">
      <Flex
        flexDirection="column"
        width="360px"
        flexShrink={0}
        backgroundColor="white"
      >
        <Flex
          position="relative"
          flexDirection="column"
          justifyContent="space-between"
          height="108px"
          padding="16px 20px 20px"
          backgroundColor="gray.50"
        >
          <BackButton marginLeft="-6px" onClick={() => navigate('/')} />
          <Flex alignItems="center">
            <AppsRhombusTwoToneIcon size={22} />
            <Text
              marginLeft="6px"
              color="gray.700"
              fontSize="16px"
              fontWeight="600"
            >
              主题色配置
            </Text>
          </Flex>
          <BasicInfoBg />
        </Flex>
        <Flex flex="1" padding="20px 24px">
          <Text {...labelStyle}>颜色编号</Text>
          <Text {...descStyle} />
        </Flex>
      </Flex>
      <Tabs
        display="flex"
        flexDirection="column"
        marginLeft="20px"
        flex="1"
        boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
        backgroundColor="white"
      >
        <CustomTabList>
          <CustomTab borderTopLeftRadius="4px" width="110px">
            效果预览
          </CustomTab>
          <CustomTab width="110px">颜色声明</CustomTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <TabPanel>效果预览</TabPanel>
          <TabPanel>颜色声明</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
