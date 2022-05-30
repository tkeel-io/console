import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { PageHeaderToolbar } from '@tkeel/console-components';

import CreatePolicyButton from '../CreatePolicyButton';

export default function PolicyTable() {
  const [keywords, setKeywords] = useState('');
  // eslint-disable-next-line no-console
  console.log('PolicyTable ~ keywords', keywords);

  return (
    <Flex>
      <PageHeaderToolbar
        name={<Flex>选择框</Flex>}
        hasSearchInput
        searchInputProps={{
          inputStyle: {
            backgroundColor: 'gray.50',
          },
          onSearch(value) {
            // setPageNum(1);
            setKeywords(value);
          },
        }}
        buttons={[<CreatePolicyButton key="create" />]}
        styles={{
          wrapper: {
            backgroundColor: 'gray.100',
          },
        }}
      />
    </Flex>
  );
}
