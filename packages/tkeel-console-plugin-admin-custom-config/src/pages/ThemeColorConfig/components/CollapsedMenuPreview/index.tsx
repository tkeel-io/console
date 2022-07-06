import { Center, Flex, StyleProps, Text } from '@chakra-ui/react';

import MenuIconPreview from '../MenuIconPreview';

interface Props {
  theme?: 'light' | 'dark';
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function CollapsedMenuPreview({
  theme = 'light',
  sx,
  styles,
}: Props) {
  const isDarkTheme = theme === 'dark';
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width="60px"
      backgroundColor={isDarkTheme ? 'grayAlternatives.800' : 'white'}
      {...styles?.root}
      {...sx}
    >
      <Center
        marginTop="18px"
        marginBottom="23px"
        flexDirection="column"
        width="32px"
        height="32px"
        color="gray.300"
        lineHeight="14px"
        backgroundColor={isDarkTheme ? 'gray.700' : 'gray.100'}
      >
        <Text>LO</Text>
        <Text>GO</Text>
      </Center>
      {Array.from({ length: 4 }).map((_, i) => {
        const isActive = i === 3;
        return (
          <Center
            key={String(i + 1)}
            width="36px"
            height="36px"
            borderRadius="4px"
            backgroundColor={isActive ? 'primary' : 'transparent'}
          >
            <MenuIconPreview active={isActive} isDarkTheme={isDarkTheme} />
          </Center>
        );
      })}
    </Flex>
  );
}
