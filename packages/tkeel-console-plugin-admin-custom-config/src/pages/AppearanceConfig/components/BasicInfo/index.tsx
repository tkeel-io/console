import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BasicInfoBg } from '@tkeel/console-business-components';
import { BackButton } from '@tkeel/console-components';
import { AppsTwoToneIcon } from '@tkeel/console-icons';

export default function BasicInfo() {
  const navigate = useNavigate();

  return (
    <Box
      backgroundColor="white"
      boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.05)"
    >
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
      <Flex
        height="40px"
        paddingLeft="20px"
        alignItems="center"
        fontSize="12px"
      >
        <Text color="grayAlternatives.300">更改通用与平台级外观配置。</Text>
        {/* <Text color="primary" cursor="pointer">
          查看文档
        </Text> */}
      </Flex>
    </Box>
  );
}
