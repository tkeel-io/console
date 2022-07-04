import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';

import CollapsedMenuPreview from '../CollapsedMenuPreview';
import ExpandMenuPreview from '../ExpandMenuPreview';

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

  const textStyle: StyleProps = {
    marginBottom: '10px',
    color: 'gray.400',
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
            .chakra-button__icon > div {
              background-color: ${addIconColor} !important;
            }
          `}
        >
          主按钮
        </CreateButton>
      ),
    },
  ];

  const menuPreviewInfoArr = [
    {
      title: '浅色/展开',
      component: <ExpandMenuPreview sx={{ flex: '1' }} />,
    },
    {
      title: '浅色/收起',
      component: <CollapsedMenuPreview sx={{ flex: '1' }} />,
    },
    {
      title: '深色/展开',
      component: <ExpandMenuPreview theme="dark" sx={{ flex: '1' }} />,
    },
    {
      title: '深色/收起',
      component: <CollapsedMenuPreview theme="dark" sx={{ flex: '1' }} />,
    },
  ];
  return (
    <Flex height="100%" flexDirection="column">
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
            <Text {...textStyle}>{label}</Text>
            {button}
          </Flex>
        ))}
        <Box position="absolute" width="100%" height="100%" />
      </Flex>
      <Text {...labelStyle} marginTop="10px">
        左侧导航
      </Text>
      <Text {...descStyle}>
        左侧导航：分为浅色模式和深色模式，拥有展开与收起2种状态
      </Text>
      <Flex flex="1" padding="16px 0 0 32px" backgroundColor="gray.100">
        {menuPreviewInfoArr.map(({ title, component }, index) => (
          <Flex
            key={title}
            marginRight={index === 1 ? '124px' : '20px'}
            flexDirection="column"
          >
            <Text {...textStyle}>{title}</Text>
            {component}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
