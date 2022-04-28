import {
  Center,
  Circle,
  Colors,
  Flex,
  StyleProps,
  useTheme,
} from '@chakra-ui/react';
import { noop } from 'lodash';
import { ReactNode } from 'react';

import { BookOpenedFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import SearchInput, {
  Props as SearchInputProps,
} from '@/tkeel-console-components/components/SearchInput';

import { ButtonWrapper } from './index.styled';

type Props = {
  name: ReactNode;
  documentsPath?: string;
  hasSearchInput?: boolean;
  searchInputProps?: SearchInputProps;
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
  documentsPath = '',
  hasSearchInput = false,
  searchInputProps = defaultSearchInputProps,
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
