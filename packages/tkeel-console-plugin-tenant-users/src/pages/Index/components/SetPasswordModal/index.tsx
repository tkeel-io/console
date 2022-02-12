import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
} from '@chakra-ui/react';
import { Alert, toast } from '@tkeel/console-components';
import { CopyFilledIcon } from '@tkeel/console-icons';
import { stringify } from 'qs';

type Props = {
  isOpen: boolean;
  title: string;
  data: {
    reset_key: string;
  };
  onClose: () => unknown;
};

export default function SetPasswordModal({
  isOpen,
  title,
  data,
  onClose,
}: Props) {
  const { origin } = window.location;
  const path = '/auth/set-password';

  const query = stringify(data, { addQueryPrefix: true });
  const url = `${origin}${path}${query}`;
  const { hasCopied, onCopy } = useClipboard(url);

  if (hasCopied) {
    toast({ status: 'success', title: '复制成功' });
  }

  return (
    <Alert
      icon="success"
      title={title}
      description="复制下方链接，邀请您的同事开始使用 tKeel"
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
          defaultValue={url}
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
          <Button variant="ghost" padding="0" borderRadius="0" onClick={onCopy}>
            <CopyFilledIcon size="16px" />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Center paddingTop="40px">
        <Button colorScheme="primary" onClick={onCopy}>
          复制链接
        </Button>
      </Center>
    </Alert>
  );
}
