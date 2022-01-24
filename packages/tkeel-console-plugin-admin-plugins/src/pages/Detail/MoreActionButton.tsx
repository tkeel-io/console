import { MouseEventHandler, useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import {
  CaretDownFilledIcon,
  CaretUpFilledIcon,
  TrashFilledIcon,
} from '@tkeel/console-icons';

import useDeletePluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useDeletePluginMutation';

type Props = {
  pluginName: string;
};
function MoreActionButton({ pluginName }: Props) {
  const [showActionList, setShowActionList] = useState(false);

  const { mutate } = useDeletePluginMutation({
    name: pluginName,
    onSuccess: () => {
      setShowActionList(false);
    },
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setShowActionList(!showActionList);
  };

  const handleDeletePlugin: MouseEventHandler<HTMLParagraphElement> = (
    event
  ) => {
    event.stopPropagation();
    mutate({});
  };

  const handleDocumentClick = () => {
    setShowActionList(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box position="relative" onClick={handleClick}>
      <Button
        colorScheme="primary"
        size="sm"
        rightIcon={
          showActionList ? (
            <CaretUpFilledIcon color="white" />
          ) : (
            <CaretDownFilledIcon color="white" />
          )
        }
      >
        更多操作
      </Button>
      {showActionList && (
        <Box
          position="absolute"
          right="0"
          top="38px"
          padding="4px 0"
          width="144px"
          backgroundColor="gray.800"
          borderRadius="4px"
        >
          <Flex
            alignItems="center"
            paddingLeft="14px"
            width="100%"
            height="32px"
            cursor="pointer"
            _hover={{ backgroundColor: 'gray.700' }}
          >
            <TrashFilledIcon color="white" />
            <Text
              marginLeft="6px"
              color="white"
              fontSize="12px"
              onClick={handleDeletePlugin}
            >
              卸载
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default MoreActionButton;
