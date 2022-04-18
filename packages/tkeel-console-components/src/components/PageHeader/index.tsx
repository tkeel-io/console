import { Center, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { BookOpenedFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

type Props = {
  icon: ReactNode;
  name: string;
  desc: string;
  documentsPath?: string;
};

function PageHeader({ icon, name, desc, documentsPath = '' }: Props) {
  const documents = plugin.getPortalDocuments();

  return (
    <Flex
      position="relative"
      padding="20px 24px"
      width="100%"
      height="100px"
      borderRadius="4px"
      backgroundColor="white"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1),
    0px 4px 6px -2px rgba(113, 128, 150, 0.05)"
    >
      <Center
        width="60px"
        height="60px"
        borderRadius="14px"
        backgroundColor="gray.100"
      >
        {icon}
      </Center>
      <Flex
        marginLeft="20px"
        flexDirection="column"
        justifyContent="center"
        color="gray.700"
      >
        <Text fontSize="14px" fontWeight="600" lineHeight="22PX">
          {name}
        </Text>
        <Text
          marginTop="5px"
          color="grayAlternatives.300"
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
          bottom="24px"
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
