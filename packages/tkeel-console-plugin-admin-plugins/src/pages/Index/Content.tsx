import { Flex, Text } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components';

import PluginList from './PluginList';

import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

const handleSearch = (keyword: string) => {
  // eslint-disable-next-line no-console
  console.log('keyword', keyword);
};

type Props = {
  pluginInfos: PluginInfo[];
};

function Content({ pluginInfos }: Props) {
  const { length: totalNum } = pluginInfos;
  const installedNum = pluginInfos.filter((info) => !!info.installed).length;
  const pluginNum = [
    {
      name: '插件数量',
      num: totalNum,
    },
    {
      name: '已安装',
      num: installedNum,
    },
    {
      name: '未安装',
      num: totalNum - installedNum,
    },
  ];

  return (
    <Flex
      flexDirection="column"
      height="100%"
      paddingTop="17px"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Flex margin="0 24px" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          {pluginNum.map((item) => (
            <Flex key={item.name} alignItems="center" marginRight="5px">
              <Text color="gray.700" fontSize="12px" fontWeight="500">
                {item.name}
              </Text>
              <Text
                marginLeft="2px"
                color="gray.500"
                fontSize="12px"
                fontWeight="500"
              >
                {item.num}
              </Text>
            </Flex>
          ))}
        </Flex>
        <SearchInput
          width="452px"
          placeholder="搜索插件"
          onSearch={handleSearch}
        />
      </Flex>
      <PluginList pluginInfos={pluginInfos} />
    </Flex>
  );
}

export default Content;
