import { ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon } from '@tkeel/console-icons';

type Props = {
  pluginName: string;
  operatorButton: ReactNode;
  bottomInfo: ReactNode;
  onClick: () => unknown;
};

function PluginCard({
  pluginName,
  operatorButton,
  bottomInfo,
  onClick,
}: Props) {
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
      _hover={{
        boxShadow: '0px 4px 8px rgba(113, 128, 150, 0.1)',
      }}
      onClick={onClick}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <BoxTwoToneIcon size={28} />
          <Text marginLeft="8px" color="gray.800" fontSize="14px">
            {pluginName}
          </Text>
        </Flex>
        {operatorButton}
      </Flex>
      <Text color="gray.500" fontSize="12px" height="20px" isTruncated>
        安装用于管理设备的插件
      </Text>
      {bottomInfo}
    </Flex>
  );
}

export default PluginCard;
