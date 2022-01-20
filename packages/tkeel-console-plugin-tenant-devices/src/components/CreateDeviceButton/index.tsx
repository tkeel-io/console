import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { AddFilledIcon } from '@tkeel/console-icons';

import Modal from '../CustomModal';
import ProgressSchedule from '../ProgressSchedule';

export default function CreateDeviceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        colorScheme="primary"
        h="32px"
        fontSize="12px"
        leftIcon={<AddFilledIcon color="white" />}
        onClick={onOpen}
      >
        添加设备
      </Button>
      <Modal
        title={<Text fontSize="14px">创建设备</Text>}
        isOpen={isOpen}
        onClose={onClose}
        footer={null}
      >
        <Flex
          bg="gray.50"
          p="12px 12px 12px 20px"
          borderRadius="4px"
          flexDirection="row"
          minH="600px"
        >
          <Box w="127px">
            <ProgressSchedule />
          </Box>
          <Box bg="white" flex="1" borderRadius="4px">
            主要内容
          </Box>
        </Flex>
      </Modal>
    </>
  );
}
