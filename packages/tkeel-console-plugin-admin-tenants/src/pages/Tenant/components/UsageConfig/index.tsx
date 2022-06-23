import type { ButtonProps } from '@chakra-ui/react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Empty, IconButton } from '@tkeel/console-components';
import {
  CloseCircleTwoToneIcon,
  FloppyDiskTwoToneIcon,
  PencilTwoToneIcon,
  RestartTwoToneIcon,
} from '@tkeel/console-icons';

const buttonProps: ButtonProps = {
  backgroundColor: 'gray.50',
  color: 'gray.800',
  lineHeight: '20px',
  fontWeight: '400',
  colorScheme: 'gray',
  variant: 'outline',
};

export default function UsageConfig() {
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');

  return (
    <Flex flexDirection="column" height="100%" padding="12px 0">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        paddingBottom="12px"
      >
        <Text
          paddingRight="24px"
          fontSize="14px"
          fontWeight="600"
          lineHeight="32px"
          color="gray.800"
        >
          用量配置
        </Text>
        <HStack alignItems="center" spacing="12px">
          {currentMode === 'view' && (
            <>
              <IconButton
                {...buttonProps}
                icon={<PencilTwoToneIcon size="16px" />}
                onClick={() => setCurrentMode('edit')}
              >
                编辑
              </IconButton>
              <IconButton
                {...buttonProps}
                icon={<RestartTwoToneIcon size="16px" />}
              >
                恢复默认配置
              </IconButton>
            </>
          )}
          {currentMode === 'edit' && (
            <>
              <IconButton
                {...buttonProps}
                icon={<FloppyDiskTwoToneIcon size="16px" />}
              >
                保存
              </IconButton>
              <IconButton
                {...buttonProps}
                icon={<CloseCircleTwoToneIcon size="16px" />}
                onClick={() => setCurrentMode('view')}
              >
                取消
              </IconButton>
            </>
          )}
        </HStack>
      </Flex>
      <Box overflowY="auto" flex="1">
        <Empty isFullHeight />
      </Box>
    </Flex>
  );
}
