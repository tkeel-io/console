import { Flex, Input, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { BasicInfoBg } from '@tkeel/console-business-components';
import {
  BackButton,
  CustomTab,
  CustomTabList,
  FormField,
} from '@tkeel/console-components';
import { AppsTwoToneIcon } from '@tkeel/console-icons';

import ConfigItem from './components/ConfigItem';

const { TextField, TextareaField } = FormField;

type ConfigField = {
  companyName: string;
  slogan: string;
};

export default function AppearanceConfig() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm<ConfigField>();

  const tabPanelStyle = {
    height: '100%',
    padding: '12px 20px',
    backgroundColor: 'white',
  };

  const TabPanelTitle = (
    <Text color="gray.800" fontSize="14px" fontWeight="600" lineHeight="32px">
      效果预览
    </Text>
  );

  return (
    <Flex>
      <Flex flexDirection="column" width="360px" backgroundColor="white">
        <Flex
          position="relative"
          flexDirection="column"
          justifyContent="space-between"
          padding="16px 22px 22px"
          width="100%"
          height="108px"
          backgroundColor="gray.50"
        >
          <BackButton marginLeft="-8px" onClick={() => navigate('/')} />
          <Flex alignItems="center">
            <AppsTwoToneIcon size={19} />
            <Text
              marginLeft="8px"
              color="gray.700"
              fontSize="14px"
              fontWeight="600"
            >
              外观配置
            </Text>
          </Flex>
          <BasicInfoBg />
        </Flex>
        <Flex flexDirection="column" padding="20px 24px">
          <ConfigItem
            title="公司简称"
            desc="建议不超过 8 个字节，公司简称将用在登录欢迎页、左侧导航等。"
            formField={
              <TextField
                id="companyName"
                error={errors.companyName}
                registerReturn={register('companyName', {
                  required: { value: true, message: '请输入公司名称' },
                })}
              />
            }
          />
          <ConfigItem
            title="Slogan"
            desc="Slogan 将用在一些登录欢迎页。"
            formField={
              <TextareaField
                id="companyName"
                error={errors.slogan}
                registerReturn={register('companyName', {
                  required: { value: true, message: '请输入 Slogan' },
                })}
              />
            }
          />
          <ConfigItem
            title="Logo"
            desc="建议上传 1M 以内的 jpg/jpeg/gif/png/svg 作为您公司的Logo ，图片大小建议为 96px*96px 。"
            formField={<Input type="file" />}
          />
        </Flex>
      </Flex>
      <Tabs
        display="flex"
        flexDirection="column"
        marginLeft="20px"
        flex="1"
        boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
      >
        <CustomTabList>
          <CustomTab borderTopLeftRadius="4px">登录欢迎页</CustomTab>
          <CustomTab>左侧导航</CustomTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <TabPanel {...tabPanelStyle}>{TabPanelTitle}1</TabPanel>
          <TabPanel {...tabPanelStyle}>{TabPanelTitle}2</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
