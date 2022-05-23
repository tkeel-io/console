import { Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@tkeel/console-components';
import { BrushTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import configBlockImg from '@/tkeel-console-plugin-admin-custom-config/assets/images/config-block.png';
import curlyBracesImg from '@/tkeel-console-plugin-admin-custom-config/assets/images/curly-braces.svg';

import ConfigButton from './components/ConfigButton';
import ConfigCard from './components/ConfigCard';
import ThemeColorConfig from './components/ThemeColorConfig';

export default function Index() {
  const navigate = useNavigate();
  const documents = plugin.getPortalDocuments();
  const configNodeInfos = [
    {
      title: '主题色配置',
      desc: '设定系统主题色，采用定制化配置插件实现一键换肤',
      children: <ThemeColorConfig />,
    },
    {
      title: '外观配置',
      desc: '更改通用与平台级外观配置',
      children: (
        <ConfigButton
          title="更改外观配置"
          onClick={() => navigate('/appearance-config?menu-collapsed=true')}
        />
      ),
    },
    {
      title: '功能菜单配置',
      desc: '对已安装的插件进行排序，租户下菜单根据排序和启用情况展示',
      children: <ConfigButton title="更改菜单配置" disable />,
    },
  ];

  return (
    <Flex flex="1" flexDirection="column" overflowY="auto">
      <PageHeader
        icon={
          <BrushTwoToneIcon
            size={26}
            color="gray.300"
            twoToneColor="gray.700"
          />
        }
        name="定制化配置"
        desc="对平台进行主题色、外观与功能菜单配置"
        documentsPath={documents.config.paths.adminGuide.customConfig}
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
          minHeight="320px"
          padding="24px 32px"
          backgroundColor="gray.50"
        >
          <Image width="280px" height="100%" src={configBlockImg} />
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
