import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Alert } from '@tkeel/console-components';
import { CopyFilledIcon } from '@tkeel/console-icons';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function CreateUserSuccessModal({ isOpen, onClose }: Props) {
  return (
    <Alert
      icon="success"
      title="创建成功"
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
          defaultValue="https://github.com/tkeel-io/docs/设置密码"
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
          <Button variant="ghost" padding="0" borderRadius="0">
            <CopyFilledIcon size="16px" />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Center paddingTop="40px">
        <Button colorScheme="primary">复制链接</Button>
      </Center>
    </Alert>
  );
}
