import { Button, Flex, Portal, Text } from '@chakra-ui/react';

import type { DocumentsProps } from '@tkeel/console-types';

export default function Documents({
  isOpen,
  baseURL,
  path,
  setPath,
  onClose,
}: DocumentsProps) {
  const url = `${baseURL}${path}`;

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <Flex
        position="fixed"
        top="12px"
        right="12px"
        bottom="12px"
        zIndex="999"
        flexDirection="column"
        width="360px"
        backgroundColor="gray.100"
        boxShadow="-8px 4px 20px rgba(182, 194, 205, 0.3), 8px -4px 20px rgba(182, 194, 205, 0.3), 0px 12px 20px rgba(182, 194, 205, 0.3)"
        borderRadius="4px"
      >
        <Button
          onClick={() => {
            setPath('');
            onClose();
          }}
        >
          close
        </Button>
        <iframe title="documents" src={url} style={{ flex: 1 }} />
        <Flex height="50px" backgroundColor="gray.100">
          <Text>在使用文档中打开</Text>
        </Flex>
      </Flex>
    </Portal>
  );
}
