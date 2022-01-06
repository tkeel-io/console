import React from 'react';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { Editor, Modal } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

import mockParams from '../Detail/mockParams';

function CreatePluginButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        position="absolute"
        right="2px"
        top="2px"
        size="md"
        leftIcon={<AddFilledIcon color="white" />}
        onClick={onOpen}
      >
        创建插件源
      </Button>
      <Modal
        title={
          <Text color="gray.800" fontSize="14px">
            设置配置
          </Text>
        }
        footer={
          <>
            <Button onClick={onClose}>取消</Button>
            <Button marginLeft="12px" colorScheme="tKeel">
              确定
            </Button>
          </>
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <Editor
          width="100%"
          height="416px"
          language="yaml"
          value={mockParams}
          readOnly
        />
      </Modal>
    </>
  );
}

export default CreatePluginButton;
