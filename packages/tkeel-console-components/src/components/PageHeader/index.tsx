import { Center, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { BookOpenedFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

type Props = {
  icon: ReactNode;
  name: string;
  desc?: string | ReactNode;
  documentsPath?: string;
};

function PageHeader({ icon, name, desc = '', documentsPath = '' }: Props) {
  const documents = plugin.getPortalDocuments();

  return (
    <Flex
      flexShrink={0}
      position="relative"
      alignItems="center"
      padding="0 24px"
      width="100%"
      height="84px"
      borderRadius="4px"
      backgroundColor="gray.50"
    >
      <Center
        width="56px"
        height="56px"
        borderRadius="14px"
        backgroundColor="gray.100"
        css={`
          svg {
            width: 40px;
            height: 40px;
          }
        `}
      >
        {icon}
      </Center>
      <Flex
        marginLeft="20px"
        flexDirection="column"
        justifyContent="center"
        color="gray.700"
      >
        <Text
          fontSize="18px"
          color="gray.800"
          fontWeight="600"
          lineHeight="22PX"
        >
          {name}
        </Text>
        <Text
          marginTop="5px"
          color="gray.500"
          fontSize="12px"
          lineHeight="17px"
        >
          {desc}
        </Text>
      </Flex>
      {documentsPath && (
        <Flex
          position="absolute"
          right="32px"
          bottom="14px"
          alignItems="center"
          cursor="pointer"
          onClick={() => documents.open(documentsPath)}
        >
          <BookOpenedFilledIcon color="grayAlternatives.300" />
          <Text marginLeft="8px" color="grayAlternatives.300" fontSize="12px">
            帮助引导
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default PageHeader;
