import { ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BookOpenedFilledIcon } from '@tkeel/console-icons';
import { noop } from 'lodash';

import SearchInput, {
  Props as SearchInputProps,
} from '@/tkeel-console-components/components/SearchInput';

import { ButtonWrapper } from './index.styled';

type Props = {
  name: string;
  hasSearchInput?: boolean;
  searchInputProps?: SearchInputProps;
  buttons?: ReactNode[];
};

const defaultSearchInputProps = {
  width: '180px',
  placeholder: '搜索',
  onSearch: noop,
};

function PageHeaderToolbar({
  name,
  hasSearchInput = false,
  searchInputProps = defaultSearchInputProps,
  buttons = [],
}: Props) {
  const siProps = { ...defaultSearchInputProps, ...searchInputProps };

  return (
    <Flex
      alignItems="center"
      width="100%"
      height="48px"
      padding="0 20px"
      backgroundColor="#fff"
    >
      {name && (
        <Flex paddingRight="30px">
          <Text fontSize="14px" lineHeight="24px" color="gray.800">
            {name}
          </Text>
          <BookOpenedFilledIcon />
        </Flex>
      )}
      <Flex flex={1} justifyContent="flex-end">
        {hasSearchInput && <SearchInput {...siProps} />}
      </Flex>
      {buttons.length > 0 && (
        <Flex paddingLeft="8px">
          {buttons.map((button, index) => (
            <ButtonWrapper key={String(index)}>{button}</ButtonWrapper>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default PageHeaderToolbar;
