import { Box, Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { useColor } from '@tkeel/console-hooks';
import {
  CollapseFilledIcon,
  ExpandFilledIcon,
  MoonCircleFilledIcon,
  SunFilledIcon,
} from '@tkeel/console-icons';

import { setLocalMenuTheme } from '@/tkeel-console-portal-base/utils';

interface Props {
  isDarkMenu: boolean;
  collapsed: boolean;
  setMenuTheme: Dispatch<SetStateAction<'dark' | 'light'>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function MenuTools({
  isDarkMenu,
  collapsed,
  setMenuTheme,
  setCollapsed,
}: Props) {
  const iconColor = 'grayAlternatives.300';
  const whiteColor = `${useColor('white')} !important`;

  const iconHoverStyle = {
    '& > svg': {
      fill: isDarkMenu ? whiteColor : iconColor,
    },
  };

  const textColor = isDarkMenu ? 'gray.400' : 'gray.600';
  const collapseHoverStyle = {
    ...iconHoverStyle,
    '& > p': {
      color: isDarkMenu ? whiteColor : textColor,
    },
  };

  const getChangeThemeIconProps = (theme: 'dark' | 'light') => ({
    color: iconColor,
    style: { marginBottom: '20px' },
    _hover: {
      color: whiteColor,
    },
    onClick() {
      setLocalMenuTheme(theme);
      setMenuTheme(theme);
    },
  });

  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      position="absolute"
      left={collapsed ? '22px' : '32px'}
      bottom="20px"
      cursor="pointer"
    >
      {isDarkMenu ? (
        <Box _hover={iconHoverStyle}>
          <SunFilledIcon {...getChangeThemeIconProps('light')} />
        </Box>
      ) : (
        <MoonCircleFilledIcon {...getChangeThemeIconProps('dark')} />
      )}
      {collapsed ? (
        <Box _hover={iconHoverStyle}>
          <ExpandFilledIcon
            color={iconColor}
            onClick={() => setCollapsed(false)}
          />
        </Box>
      ) : (
        <Flex
          alignItems="center"
          onClick={() => setCollapsed(true)}
          _hover={collapseHoverStyle}
        >
          <CollapseFilledIcon color={iconColor} />
          <Text
            marginLeft="8px"
            color={isDarkMenu ? 'gray.400' : 'gray.600'}
            fontSize="12px"
          >
            收起
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
