import { Button, CloseButton, Flex, HStack } from '@chakra-ui/react';

import { AceEditor } from '@tkeel/console-components';

import tenantMenus from './tenantMenus';

type Props = {
  mockMenus: string;
  setMockMenus: (menus: string) => unknown;
  onClose: () => unknown;
};

export default function MenuSetting({
  mockMenus,
  setMockMenus,
  onClose,
}: Props) {
  return (
    <Flex
      position="fixed"
      left="0"
      bottom="0"
      zIndex="10"
      flexDirection="column"
      padding="20px"
      width="100%"
      height="600px"
      maxHeight="100vh"
      backgroundColor="white"
    >
      <CloseButton
        position="absolute"
        right="20px"
        top="20px"
        onClick={onClose}
      />
      <HStack flex="1" spacing="20px">
        <AceEditor
          language="json"
          value={mockMenus}
          readOnly={false}
          onChange={(value) => setMockMenus(value)}
        />
        <AceEditor
          language="json"
          value={JSON.stringify(tenantMenus, null, 2)}
        />
      </HStack>
      <HStack marginTop="10px" spacing="10px">
        <Button width="80px" onClick={onClose}>
          关闭
        </Button>
        <Button
          marginTop="10px"
          colorScheme="primary"
          width="80px"
          onClick={() => {
            sessionStorage.setItem('mockMenus', mockMenus);
            onClose();
          }}
        >
          保存
        </Button>
      </HStack>
    </Flex>
  );
}
