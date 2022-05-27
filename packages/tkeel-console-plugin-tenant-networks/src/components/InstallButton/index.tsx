import {
  Box,
  Button,
  Center,
  Flex,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';

import { Alert, Loading, MoreActionButton } from '@tkeel/console-components';
import { CommandWindowFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useNetworkInfoQuery from '@/tkeel-console-plugin-tenant-networks/hooks/queries/useNetworkInfoQuery';

interface Props {
  id: string;
}

function InstallButton({ id }: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useNetworkInfoQuery(id, isOpen);
  const token = data?.client?.token ?? '';
  const command = data?.command ?? '';
  const tokenCenter = token.slice(4, -4);
  const secretCopyData = command.replace(tokenCenter, '********');
  const { hasCopied, onCopy } = useClipboard(command);
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
          {isLoading ? (
            <Loading styles={{ wrapper: { height: '100%' } }} />
          ) : (
            <>
              <Box
                width="320px"
                mt="24px"
                p="4px 8px"
                fontSize="12px"
                color="grayAlternatives.50"
                lineHeight="20px"
                bgColor="gray.700"
                borderRadius="4px"
              >
                {secretCopyData}
              </Box>
              <Flex paddingTop="40px" flexDirection="column">
                <Button
                  type="button"
                  variant="outline"
                  width="full"
                  height="32px"
                  borderRadius="4px"
                  backgroundColor="green.300"
                  color="white"
                  mb="16px"
                  _hover={{ bgColor: 'green.300' }}
                  onClick={onCopy}
                >
                  复制命令
                </Button>
                <Button
                  onClick={onClose}
                  type="button"
                  variant="outline"
                  width="full"
                  backgroundColor="white"
                  color="gray.600"
                  border="none"
                  _hover={{ bgColor: 'white' }}
                >
                  完成
                </Button>
              </Flex>
            </>
          )}
        </Alert>
      )}
    </>
  );
}

export default InstallButton;
