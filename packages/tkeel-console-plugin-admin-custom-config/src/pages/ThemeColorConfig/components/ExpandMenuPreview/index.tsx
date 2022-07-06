import { Box, Center, Flex, Image, StyleProps, Text } from '@chakra-ui/react';

import logoBottomLineDark from '@/tkeel-console-business-components/assets/images/logo-bottom-line-dark.svg';
import logoBottomLineLight from '@/tkeel-console-business-components/assets/images/logo-bottom-line-light.svg';

import MenuIconPreview from '../MenuIconPreview';

interface Props {
  theme?: 'light' | 'dark';
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function ExpandMenuPreview({
  theme = 'light',
  sx,
  styles,
}: Props) {
  const isDarkTheme = theme === 'dark';
  return (
    <Box
      width="240px"
      backgroundColor={isDarkTheme ? 'grayAlternatives.800' : 'white'}
      {...styles?.root}
      {...sx}
    >
      <Center height="60px">
        <Center
          width="200px"
          height="36px"
          color="gray.300"
          backgroundColor={isDarkTheme ? 'gray.700' : 'gray.100'}
        >
          LOGO
        </Center>
      </Center>
      <Image
        marginLeft="20px"
        marginBottom="12px"
        src={isDarkTheme ? logoBottomLineDark : logoBottomLineLight}
      />
      {Array.from({ length: 4 }).map((_, i) => {
        const isActive = i === 3;
        const menuColor = isDarkTheme ? 'gray.400' : 'grayAlternatives.400';
        return (
          <Flex
            key={String(i + 1)}
            height="36px"
            paddingLeft="20px"
            alignItems="center"
            backgroundColor={isActive ? 'primary' : 'transparent'}
          >
            <MenuIconPreview active={isActive} isDarkTheme={isDarkTheme} />
            <Text
              marginLeft="10px"
              color={isActive ? 'white' : menuColor}
              fontSize="12px"
              fontWeight={isActive ? '600' : 'normal'}
            >
              一级菜单
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
}
