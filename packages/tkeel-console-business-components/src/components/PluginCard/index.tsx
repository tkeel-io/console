import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { BoxTwoToneIcon } from '@tkeel/console-icons';

type Props = {
  briefPluginInfo: {
    name: string;
    icon?: string;
    desc?: string;
  };
  operatorButton: ReactNode;
  bottomInfo: ReactNode;
  onClick: () => unknown;
};

function PluginCard({
  briefPluginInfo,
  operatorButton,
  bottomInfo,
  onClick,
}: Props) {
  const name = briefPluginInfo?.name ?? '';
  const desc = briefPluginInfo?.desc ?? '';

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
          <Box flexShrink={0}>
            {briefPluginInfo?.icon ? (
              <Image width="28px" height="28px" src={briefPluginInfo.icon} />
            ) : (
              <BoxTwoToneIcon size={28} />
            )}
          </Box>
          <Text
            marginLeft="8px"
            lineHeight="18px"
            color="gray.800"
            fontSize="14px"
            noOfLines={2}
            title={name}
          >
            {name}
          </Text>
        </Flex>
        {operatorButton}
      </Flex>
      <Text
        color="gray.500"
        fontSize="12px"
        height="20px"
        isTruncated
        title={desc}
      >
        {desc}
      </Text>
      {bottomInfo}
    </Flex>
  );
}

export default PluginCard;
