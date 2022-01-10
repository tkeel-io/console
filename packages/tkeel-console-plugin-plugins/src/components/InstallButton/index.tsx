import React, { MouseEventHandler } from 'react';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { Editor, Modal } from '@tkeel/console-components';
import { DownloadFilledIcon } from '@tkeel/console-icons';

import mockParams from '@/tkeel-console-plugin-plugins/pages/Detail/mockParams';

type Props = {
  size?: string;
};

const defaultProps = {
  size: 'xs',
};

function InstallButton({ size }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let timer: number | null = null;

  const handleInstall: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!timer) {
      timer = window.setTimeout(() => {
        timer = null;
        onClose();
      }, 500);
    }
  };

  return (
    <>
      <Button
        colorScheme="primary"
        variant="solid-no-shadow"
        size={size}
        leftIcon={<DownloadFilledIcon size={12} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        安装
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
            <Button
              marginLeft="12px"
              colorScheme="primary"
              onClick={handleInstall}
            >
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

InstallButton.defaultProps = defaultProps;

export default InstallButton;
