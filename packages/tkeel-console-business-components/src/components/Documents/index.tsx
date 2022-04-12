import { Button, Flex, Portal, Skeleton, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { CloseButton } from '@tkeel/console-components';
import { ArrowRightFilledIcon } from '@tkeel/console-icons';
import type { DocumentsProps } from '@tkeel/console-types';

export default function Documents({
  isOpen,
  baseURL,
  path,
  setPath,
  onClose,
}: DocumentsProps) {
  const url = `${baseURL}${path}`;

  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsIFrameLoaded(true);
  };

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
        <Flex
          position="absolute"
          top="0"
          right="0"
          bottom="50px"
          left="0"
          justifyContent="space-between"
          alignItems="center"
          height="50px"
          padding="0 20px 0 18px"
          backgroundColor="gray.100"
        >
          <Text fontSize="14px" lineHeight="24px" color="gray.800">
            帮助文档
          </Text>
          <CloseButton
            marginLeft="12px"
            onClick={() => {
              setPath('');
              setIsIFrameLoaded(false);
              onClose();
            }}
          />
        </Flex>
        {!isIFrameLoaded && (
          <Skeleton
            position="absolute"
            top="50px"
            right="0"
            bottom="50px"
            left="0"
          />
        )}
        <iframe
          title="documents"
          src={url}
          style={{ flex: 1 }}
          onLoad={handleOnLoad}
        />
        <Flex alignItems="center" height="50px" padding="0 20px">
          <Button
            variant="link"
            _hover={{
              opacity: 0.7,
            }}
            as="a"
            href={baseURL}
            target="_blank"
          >
            <Text
              marginRight="4px"
              fontSize="14px"
              lineHeight="24px"
              color="primary"
            >
              在使用文档中打开
            </Text>
            <ArrowRightFilledIcon size="16px" color="primary" />
          </Button>
        </Flex>
      </Flex>
    </Portal>
  );
}
