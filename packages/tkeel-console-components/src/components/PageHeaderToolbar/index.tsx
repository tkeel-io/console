import {
  Center,
  Circle,
  Colors,
  Flex,
  HStack,
  StyleProps,
  useTheme,
} from '@chakra-ui/react';
import { noop } from 'lodash';
import { ReactNode } from 'react';

import {
  BookOpenedFilledIcon,
  RefreshCircleFilledIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import SearchInput, {
  Props as SearchInputProps,
} from '@/tkeel-console-components/components/SearchInput';

import { ButtonWrapper } from './index.styled';

type Props = {
  name?: ReactNode;
  selectElements?: ReactNode[];
  documentsPath?: string;
  hasSearchInput?: boolean;
  hasRefreshIcon?: boolean;
  isShowRefreshIconBg?: boolean;
  searchInputProps?: SearchInputProps;
  onRefresh?: () => unknown;
  buttons?: ReactNode[];
  styles?: {
    wrapper?: StyleProps;
    title?: StyleProps;
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
  selectElements = [],
  documentsPath = '',
  hasSearchInput = false,
  hasRefreshIcon = false,
  isShowRefreshIconBg = false,
  searchInputProps = defaultSearchInputProps,
  onRefresh,
  buttons = [],
  styles = {},
}: Props) {
  const documents = plugin.getPortalDocuments();
  const siProps = { ...defaultSearchInputProps, ...searchInputProps };
  const { colors }: { colors: CustomColor } = useTheme();

  return (
    <Flex alignItems="center" width="100%" height="48px" {...styles?.wrapper}>
      {name && (
        <Flex paddingRight="30px">
          <Center
            fontSize="18px"
            fontWeight="600"
            lineHeight="26px"
            color="gray.700"
            {...styles?.title}
          >
            {name}
          </Center>
          {documentsPath && (
            <Center paddingLeft="4px">
              <Circle
                size="26px"
                _hover={{
                  backgroundColor: 'grayAlternatives.50',
                  cursor: 'pointer',

                  '& > svg': {
                    fill: `${colors.primary} !important`,
                  },
                }}
                onClick={() => documents.open(documentsPath)}
              >
                <BookOpenedFilledIcon color="grayAlternatives.300" />
              </Circle>
            </Center>
          )}
        </Flex>
      )}
      {selectElements && selectElements.length > 0 && (
        <HStack paddingRight="12px" spacing="12px">
          {selectElements}
        </HStack>
      )}
      <Flex flex="1" justifyContent="flex-end">
        {hasSearchInput && <SearchInput {...siProps} />}
      </Flex>
      {hasRefreshIcon && (
        <Center
          marginLeft="12px"
          width="32px"
          height="32px"
          borderRadius="20px"
          cursor="pointer"
          backgroundColor={isShowRefreshIconBg ? 'gray.100' : 'transparent'}
        >
          <RefreshCircleFilledIcon
            color="grayAlternatives.300"
            onClick={() => onRefresh && onRefresh()}
          />
        </Center>
      )}
      {buttons.length > 0 && (
        <Flex paddingLeft="12px">
          {buttons.map((button, index) => (
            <ButtonWrapper key={String(index + 1)}>{button}</ButtonWrapper>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default PageHeaderToolbar;
