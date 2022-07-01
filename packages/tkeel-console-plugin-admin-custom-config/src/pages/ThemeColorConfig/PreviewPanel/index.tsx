import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';

export default function PreviewPanel() {
  const labelStyle: StyleProps = {
    color: 'gray.700',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '32px',
  };

  const descStyle: StyleProps = {
    marginBottom: '10px',
    color: 'blackAlpha.500',
    fontSize: '12px',
  };

  const addIconColor = useColor('brand.400');
  const buttonInfoArr = [
    {
      label: '正常',
      button: <CreateButton>主按钮</CreateButton>,
    },
    {
      label: '悬浮',
      button: <CreateButton backgroundColor="brand.700">主按钮</CreateButton>,
    },
    {
      label: '激活',
      button: <CreateButton backgroundColor="brand.600">主按钮</CreateButton>,
    },
    {
      label: '禁用',
      button: (
        <CreateButton
          backgroundColor="brand.300"
          css={`
            .chakra-button__icon svg {
              color: ${addIconColor} !important;
            }
          `}
        >
          主按钮
        </CreateButton>
      ),
    },
  ];

  return (
    <Flex flexDirection="column">
      <Text {...labelStyle}>主按钮</Text>
      <Text {...descStyle}>
        主按钮：突出“创建”类操作，一个按钮区最多使用一个主按钮
      </Text>
      <Flex position="relative" height="96px" backgroundColor="gray.100">
        {buttonInfoArr.map(({ label, button }) => (
          <Flex
            key={label}
            marginLeft="32px"
            flexDirection="column"
            justifyContent="center"
          >
            <Text marginBottom="10px" color="gray.400" fontSize="12px">
              {label}
            </Text>
            {button}
          </Flex>
        ))}
        <Box position="absolute" width="100%" height="100%" />
      </Flex>
    </Flex>
  );
}
