import { useNavigate } from 'react-router-dom';
import { Flex, Tag, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon } from '@tkeel/console-icons';

import InstallButton from '@/tkeel-console-plugin-admin-plugins/components/InstallButton';
import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

type Props = {
  pluginInfo: PluginInfo;
};

function Card({ pluginInfo }: Props) {
  const { name, version, repo, installed } = pluginInfo;

  const navigate = useNavigate();

  return (
    <Flex
      position="relative"
      padding="12px"
      flexDirection="column"
      justifyContent="space-between"
      height="108px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="white"
      cursor="pointer"
      _after={{
        display: 'none',
        content: '""',
        position: 'absolute',
        left: '0',
        top: '-1px',
        width: '100%',
        height: '4px',
        backgroundColor: 'primary',
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
      }}
      _hover={{
        boxShadow: '0px 4px 8px rgba(36, 46, 66, 0.06)',
        '&::after': {
          display: 'block',
        },
      }}
      onClick={() => {
        navigate(`/detail/${repo}/${name}/${version}`);
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <BoxTwoToneIcon size={28} />
          <Text marginLeft="8px" color="gray.800" fontSize="14px">
            {name}
          </Text>
        </Flex>
        {!installed && <InstallButton pluginInfo={pluginInfo} />}
      </Flex>
      <Text color="gray.500" fontSize="12px" height="20px" isTruncated>
        安装用于管理设备的插件
      </Text>
      <Flex justifyContent="space-between">
        <Tag colorScheme="orange" size="sm">
          用户
        </Tag>
        <Flex alignItems="center" color="gray.500" fontSize="12px">
          <Text>Ver：{version}</Text>
          <Text marginLeft="20px">Repo：{repo}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Card;
