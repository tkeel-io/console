import { Flex, Image, Text } from '@chakra-ui/react';

import logoBottomLineImg from '@/tkeel-console-plugin-admin-custom-config/assets/images/logo-bottom-line.svg';

interface Props {
  title: string;
  logo: string;
  type?: 'dark' | 'light';
}

export default function MenuPreview({ title, logo, type = 'dark' }: Props) {
  return (
    <Flex flexDirection="column">
      <Text color="gray.400" fontSize="12px">
        {title}
      </Text>
      <Flex
        marginTop="12px"
        flex="1"
        width="240px"
        backgroundColor={type === 'dark' ? 'grayAlternatives.800' : 'gray.50'}
      >
        <Flex flexDirection="column">
          <Flex paddingTop="17px" height="80px" paddingLeft="20px">
            <Image src={logo} height="52px" />
          </Flex>
          <Image src={logoBottomLineImg} marginLeft="20px" width="200px" />
        </Flex>
      </Flex>
    </Flex>
  );
}
