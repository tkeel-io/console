import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
} from '@chakra-ui/react';
import { stringify } from 'qs';

import { Alert, toast } from '@tkeel/console-components';
import { CopyFilledIcon } from '@tkeel/console-icons';
import { useDeploymentConfigQuery } from '@tkeel/console-request-hooks';

type Props = {
  isOpen: boolean;
  title: string;
  url?: string;
  data: {
    reset_key: string;
  };
  onClose: () => unknown;
};

export default function SetPasswordModal({
  isOpen,
  title,
  url,
  data,
  onClose,
}: Props) {
  const { isLoading, config } = useDeploymentConfigQuery();
  const defaultURL = `${config.portalTenantURL}/auth/set-password`;
  const query = stringify(data, { addQueryPrefix: true });
  const fullURL = `${url || defaultURL}${query}`;
  const { hasCopied, onCopy } = useClipboard(fullURL);

  if (hasCopied) {
    toast({ status: 'success', title: '复制成功' });
  }

  return (
    <Alert
      icon="success"
      title={title}
      description="复制下方链接，发送给用户设置密码"
      isOpen={isOpen}
      onClose={onClose}
    >
      <InputGroup
        width="320px"
        height="36px"
        marginTop="12px"
        backgroundColor="gray.100"
        borderRadius="2px"
      >
        <Input
          type="text"
          value={fullURL}
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
      <Center paddingTop="40px">
        <Button colorScheme="primary" isLoading={isLoading} onClick={onCopy}>
          复制链接
        </Button>
      </Center>
    </Alert>
  );
}
