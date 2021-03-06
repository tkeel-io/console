import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Alert } from '@tkeel/console-components';
import { CopyFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

type Props = {
  isOpen: boolean;
  title: ReactNode;
  description: ReactNode;
  url: string;
  isLoading: boolean;
  onClose: () => void;
};

export default function SetPasswordModal({
  isOpen,
  title,
  description,
  url,
  isLoading,
  onClose,
}: Props) {
  const toast = plugin.getPortalToast();
  const { hasCopied, onCopy } = useClipboard(url);

  if (hasCopied) {
    toast('复制成功', { status: 'success' });
  }

  return (
    <Alert
      icon="success"
      width="600px"
      title={title}
      description={description}
      isOpen={isOpen}
      styles={{ description: { paddingTop: '20px', textAlign: 'left' } }}
      onClose={onClose}
    >
      <InputGroup
        width="520px"
        height="36px"
        marginTop="8px"
        backgroundColor="gray.100"
        borderRadius="2px"
      >
        <Input
          type="text"
          value={url}
          variant="filled"
          isReadOnly
          height="100%"
          paddingRight="32px"
          paddingLeft="12px"
          border="0"
          color="gray.600"
          fontSize="12px"
          lineHeight="140%"
        />
        <InputRightElement width="32px" height="100%">
          <Button
            variant="ghost"
            isLoading={isLoading}
            padding="0"
            borderRadius="0"
            onClick={onCopy}
          >
            <CopyFilledIcon size="16px" />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Center paddingTop="32px">
        <Button
          colorScheme="brand"
          isLoading={isLoading}
          onClick={() => {
            onCopy();
            setTimeout(onClose, 300);
          }}
        >
          复制链接并关闭
        </Button>
      </Center>
    </Alert>
  );
}
