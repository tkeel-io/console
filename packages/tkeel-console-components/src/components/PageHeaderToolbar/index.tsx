import { Flex, Text } from '@chakra-ui/react';
import { noop } from 'lodash';

import SearchInput, {
  Props as SearchInputProps,
} from '@/tkeel-console-components/components/SearchInput';

type Props = {
  name: string;
  hasSearchInput?: boolean;
  searchInputProps?: SearchInputProps;
};

function PageHeaderToolbar({
  name,
  hasSearchInput = false,
  searchInputProps = { onSearch: noop },
}: Props) {
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
      <Flex flex={1} padding="0 16px">
        {hasSearchInput && <SearchInput {...searchInputProps} />}
      </Flex>
    </Flex>
  );
}

export default PageHeaderToolbar;
