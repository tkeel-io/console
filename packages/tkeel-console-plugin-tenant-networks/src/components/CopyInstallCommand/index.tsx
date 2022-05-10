import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  useClipboard,
} from '@chakra-ui/react';

import { CopyFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

type Props = {
  copyData: string;
};

export default function CopyInstallCommand({ copyData }: Props) {
  const toast = plugin.getPortalToast();
  const isLoading = false;
  const { hasCopied, onCopy } = useClipboard(copyData);

  if (hasCopied) {
    toast('复制成功', { status: 'success' });
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight="600">
          安装命令
        </Text>
        <Button
          variant="ghost"
          isLoading={isLoading}
          padding="0"
          borderRadius="0"
          onClick={onCopy}
        >
          <CopyFilledIcon size="16px" color="grayAlternatives.300" />
        </Button>
      </Flex>
      <InputGroup
        width="100%"
        height="94px"
        borderRadius="4px"
        bgColor="gray.700"
      >
        <Input
          type="text"
          value={copyData}
          variant="filled"
          isReadOnly
          height="100%"
          paddingRight="32px"
          paddingLeft="12px"
          border="0"
          color="grayAlternatives.50"
          bgColor="gray.700"
          fontSize="12px"
          lineHeight="140%"
          _hover={{
            bgColor: 'gray.700',
          }}
        />
      </InputGroup>
    </Box>
  );
}
