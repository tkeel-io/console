import { Box, Flex, Image, StyleProps, Text } from '@chakra-ui/react';

import { LogoBottomLine } from '@tkeel/console-business-components';

interface Props {
  title: string;
  logo: string;
  theme?: 'dark' | 'light';
  menu: string;
  styles?: {
    menu?: StyleProps;
  };
}

export default function MenuPreview({
  title,
  logo,
  theme = 'dark',
  menu,
  styles,
}: Props) {
  return (
    <Flex flexDirection="column">
      <Text color="gray.400" fontSize="12px">
        {title}
      </Text>
      <Flex
        marginTop="12px"
        flexDirection="column"
        flex="1"
        padding="0 20px"
        width="240px"
        backgroundColor={theme === 'dark' ? 'grayAlternatives.800' : 'gray.50'}
      >
        <Flex flexDirection="column">
          <Flex paddingTop="17px" height="80px">
            <Image src={logo} height="52px" />
          </Flex>
          <LogoBottomLine theme={theme} />
        </Flex>
        <Box paddingTop="20px" flex="1" width="100%">
          <Image src={menu} width="100%" {...styles?.menu} />
        </Box>
      </Flex>
    </Flex>
  );
}
