import {
  Center,
  Circle,
  Colors,
  Flex,
  StyleProps,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { noop } from 'lodash';
import { ReactNode } from 'react';

import { BookOpenedFilledIcon } from '@tkeel/console-icons';

import SearchInput, {
  Props as SearchInputProps,
} from '@/tkeel-console-components/components/SearchInput';

import { ButtonWrapper } from './index.styled';

type Props = {
  name: string;
  hasSearchInput?: boolean;
  searchInputProps?: SearchInputProps;
  buttons?: ReactNode[];
  hasIcon?: boolean;
  styles?: {
    wrapper?: StyleProps;
  };
};

interface CustomColor extends Colors {
  primary: string;
}

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
  hasIcon = false,
  styles = {},
}: Props) {
  const siProps = { ...defaultSearchInputProps, ...searchInputProps };
  const { colors }: { colors: CustomColor } = useTheme();

  return (
    <Flex alignItems="center" width="100%" height="48px" {...styles?.wrapper}>
      {name && (
        <Flex paddingRight="30px">
          <Text fontSize="14px" lineHeight="24px" color="gray.800">
            {name}
          </Text>
          {hasIcon && (
            <Center paddingLeft="4px">
              <Circle
                size="24px"
                _hover={{
                  backgroundColor: 'grayAlternatives.50',
                  cursor: 'pointer',

                  '& > svg': {
                    fill: `${colors.primary} !important`,
                  },
                }}
              >
                <BookOpenedFilledIcon color="grayAlternatives.300" />
              </Circle>
            </Center>
          )}
        </Flex>
      )}
      <Flex flex="1" justifyContent="flex-end">
        {hasSearchInput && <SearchInput {...siProps} />}
      </Flex>
      {buttons.length > 0 && (
        <Flex paddingLeft="8px">
          {buttons.map((button, index) => (
            <ButtonWrapper key={String(index + 1)}>{button}</ButtonWrapper>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default PageHeaderToolbar;
