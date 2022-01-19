import { Flex, Text } from '@chakra-ui/react';

import SearchInput from '@/tkeel-console-components/components/SearchInput';

type Props = {
  name: string;
};

function PageHeaderToolbar({ name }: Props) {
  return (
    <Flex
      alignItems="center"
      width="100%"
      height="48px"
      padding="0 20px"
      backgroundColor="#fff"
    >
      <Flex>
        <Text fontSize="14px" lineHeight="24px" color="gray.800">
          {name}
        </Text>
      </Flex>
      <Flex padding="0 16px">
        <SearchInput onSearch={() => {}} />
      </Flex>
    </Flex>
  );
}

export default PageHeaderToolbar;
