import { Flex, Portal, Text } from '@chakra-ui/react';

// type Props = {};

export default function Documents() {
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
        <iframe
          title="docs"
          src="http://localhost:3000/docs/tenant-guide/plugin-mgt/plugin_enable"
          style={{ flex: 1 }}
        />
        <Flex height="50px" backgroundColor="gray.100">
          <Text>在使用文档中打开</Text>
        </Flex>
      </Flex>
    </Portal>
  );
}
