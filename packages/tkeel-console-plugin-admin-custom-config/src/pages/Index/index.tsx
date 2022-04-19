import { Flex, Image, Text } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { GearTwoToneIcon } from '@tkeel/console-icons';

import curlyBracesImg from '@/tkeel-console-plugin-admin-custom-config/assets/images/curly-braces.svg';

import ConfigButton from './components/ConfigButton';
import ConfigCard from './components/ConfigCard';
import ThemeColorConfig from './components/ThemeColorConfig';

export default function Index() {
  const configNodeInfos = [
    {
      title: '主题色配置',
      desc: '设定系统主题色，根据颜色插件化配置功能实现一件换肤',
      children: <ThemeColorConfig />,
    },
    {
      title: '外观配置',
      desc: '更改公司简称、 logo 和 Slogan',
      children: <ConfigButton title="更改外观配置" />,
    },
    {
      title: '功能菜单配置',
      desc: '对已安装的插件进行排序，租户下菜单根据排序和启用情况展示',
      children: <ConfigButton title="更改菜单配置" />,
    },
  ];
  return (
    <Flex flex="1" flexDirection="column">
      <PageHeader
        icon={<GearTwoToneIcon size={26} />}
        name="定制化配置"
        desc="支持主题色、外观和功能菜单的配置"
      />
      <Flex
        flex="1"
        flexDirection="column"
        marginTop="16px"
        padding="24px 28px"
        backgroundColor="white"
      >
        <Text
          color="gray.800"
          fontSize="16px"
          fontWeight="600"
          lineHeight="22px"
        >
          定制化配置
        </Text>
        <Text
          marginTop="4px"
          color="gray.500"
          fontSize="14px"
          lineHeight="20px"
        >
          对平台进行外观配置与功能菜单配置
        </Text>
        <Flex
          flex="1"
          marginTop="10px"
          padding="24px 32px"
          backgroundColor="gray.50"
        >
          <Flex width="240px" backgroundColor="white" />
          <Flex flex="1" flexDirection="column">
            {configNodeInfos.map(({ title, desc, children }) => (
              <Flex key={title} alignItems="center" marginBottom="16px">
                <Image src={curlyBracesImg} margin="0 30px" />
                <ConfigCard
                  title={title}
                  desc={desc}
                  styles={{ wrapper: { flex: '1' } }}
                >
                  {children}
                </ConfigCard>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
