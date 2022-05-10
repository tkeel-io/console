import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { CommandWindowFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

// type Props = {
//   cruxData: {
//     id: string;
//     name: string;
//   };
//   refetch?: () => void;
//   onDeleteSuccess?: () => unknown;
// };

function InstallButton() {
  // const { id, name } = cruxData;
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoading = false;
  const text = 'stringify({ addQueryPrefix: true })';
  const { hasCopied, onCopy } = useClipboard(text);
  if (hasCopied) {
    toast('复制成功', { status: 'success' });
  }

  return (
    <>
      <MoreActionButton
        icon={<CommandWindowFilledIcon />}
        title="在线安装命令"
        onClick={onOpen}
      />
      {isOpen && (
        <Alert
          icon={
            <Center h="44px" w="44px" borderRadius="50%" bgColor="blue.50">
              <CommandWindowFilledIcon color="blue.300" size={24} />
            </Center>
          }
          title="安装命令"
          isOpen={isOpen}
          onClose={onClose}
        >
          <InputGroup
            width="320px"
            height="68px"
            marginTop="20px"
            borderRadius="4px"
            bgColor="gray.700"
          >
            <Input
              type="text"
              value="复制的内容"
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
          <Flex paddingTop="40px" flexDirection="column">
            <Button
              type="button"
              variant="outline"
              isFullWidth
              height="32px"
              borderRadius="4px"
              backgroundColor="green.300"
              color="white"
              mb="16px"
              _hover={{ bgColor: 'green.300' }}
              isLoading={isLoading}
              onClick={onCopy}
            >
              复制命令
            </Button>
            <Button
              onClick={onClose}
              type="button"
              variant="outline"
              isFullWidth
              backgroundColor="white"
              color="gray.600"
              border="none"
              _hover={{ bgColor: 'white' }}
            >
              完成
            </Button>
          </Flex>
        </Alert>
      )}
    </>
  );
}

export default InstallButton;
