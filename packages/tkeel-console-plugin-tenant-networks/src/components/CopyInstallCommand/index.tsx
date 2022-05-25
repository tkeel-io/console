import { Box, Button, Flex, Text, useClipboard } from '@chakra-ui/react';

import { CopyFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

interface Props {
  copyData: string;
  token: string;
}

export default function CopyInstallCommand({ copyData, token }: Props) {
  const toast = plugin.getPortalToast();
  const isLoading = false;
  const { hasCopied, onCopy } = useClipboard(copyData);
  const tokenCenter = token.slice(4, -4);
  const secretCopyData = copyData.replace(tokenCenter, '********');
  if (hasCopied) {
    toast('复制成功', { status: 'success' });
  }

  return (
    <Box
      _hover={{
        '.chakra-button': {
          opacity: 1,
        },
      }}
    >
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight="600">
          安装命令
        </Text>
        <Button
          variant="ghost"
          isLoading={isLoading}
          padding="0"
          borderRadius="0"
          opacity={0}
          onClick={onCopy}
        >
          <CopyFilledIcon size="16px" color="grayAlternatives.300" />
        </Button>
      </Flex>
      <Box
        width="100%"
        minHeight="68px"
        mt="6px"
        p="4px 8px"
        fontSize="12px"
        color="grayAlternatives.50"
        lineHeight="20px"
        bgColor="gray.700"
        borderRadius="4px"
      >
        {secretCopyData}
      </Box>
    </Box>
  );
}
//
