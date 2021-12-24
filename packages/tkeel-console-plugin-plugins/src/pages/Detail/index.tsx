import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon, ChevronLeftFilledIcon } from '@tkeel/console-icons';

import InstallButton from '@/components/InstallButton';

function Detail() {
  // const params = useParams();
  // eslint-disable-next-line no-console
  // console.log('Detail ~ params.id', params.id);

  const navigate = useNavigate();

  return (
    <Flex padding="20px" justifyContent="space-between">
      <Box width="360px" backgroundColor="white">
        <Box height="124px" padding="16px" backgroundColor="gray.50">
          <Flex height="28px" justifyContent="space-between">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ChevronLeftFilledIcon />}
              onClick={() => {
                navigate('/');
              }}
            >
              返回
            </Button>
            <InstallButton size="sm" />
          </Flex>
          <Flex marginTop="16px" alignItems="center">
            <Center
              width="48px"
              height="48px"
              borderRadius="16px"
              backgroundColor="gray.100"
            >
              <BoxTwoToneIcon size={22} />
            </Center>
            <Box marginLeft="16px">
              <Text color="gray.800" fontSize="14px" lineHeight="20px">
                device
              </Text>
              <Text color="gray.500" fontSize="12px" lineHeight="17px">
                安装用于管理设备的插件
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box padding="16px 24px 20px">
          <Text
            color="gray.800"
            fontSize="14px"
            lineHeight="20px"
            fontWeight="600"
          >
            基本信息
          </Text>
        </Box>
      </Box>
      <Box marginLeft="20px" flex="1" />
    </Flex>
  );
}

export default Detail;
