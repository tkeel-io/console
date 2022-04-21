import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { PageHeaderToolbar } from '@tkeel/console-components';

import AutoButton from '../AutoButton';
import AutoMappingButton from '../AutoMappingButton';

export default function MappingData() {
  const [keywords, setKeywords] = useState('');
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
    // eslint-disable-next-line no-console
    console.log(keywords);
  };
  return (
    <Flex flex="1" direction="column" height="100%">
      <PageHeaderToolbar
        styles={{ wrapper: { height: '32px', marginBottom: '12px' } }}
        name={<Text>遥测关系</Text>}
        hasSearchInput
        searchInputProps={{
          onSearch: handleSearch,
        }}
        buttons={[<AutoMappingButton key="add" />, <AutoButton key="demo" />]}
      />
    </Flex>
  );
}
