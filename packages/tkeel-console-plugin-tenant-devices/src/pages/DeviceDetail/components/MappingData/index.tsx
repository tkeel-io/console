import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { PageHeaderToolbar } from '@tkeel/console-components';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import AutoButton from '../AutoButton';
import AutoMappingButton from '../AutoMappingButton';

interface Props {
  deviceObject: DeviceObject;
}

export default function MappingData({ deviceObject }: Props) {
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
        buttons={[
          <AutoMappingButton key="add" deviceObject={deviceObject} />,
          <AutoButton key="demo" />,
        ]}
      />
    </Flex>
  );
}
