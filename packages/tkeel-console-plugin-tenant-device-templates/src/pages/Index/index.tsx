import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { PageHeaderToolbar } from '@tkeel/console-components';
// import useTemplatesQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useTemplatesQuery';
import { useTemplateQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import { CreateTemplateButton } from './components/buttons';

function Index() {
  const toast = plugin.getPortalToast();
  const defaultParams = {
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
    query: '',
    condition: [
      {
        field: 'type',
        operator: '$eq',
        value: 'template',
      },
    ],
  };

  const { items } = useTemplateQuery(defaultParams);
  // eslint-disable-next-line no-console
  console.log('Index ~ items', items);

  const [keyWord, setKeyWord] = useState('');
  // eslint-disable-next-line no-console
  console.log(keyWord);
  // console.log(keyWord, result);

  const handleCreateSuccess = () => {
    toast('请选择角色权限', { type: 'warning' });
    // eslint-disable-next-line no-console
    console.log(keyWord);
  };

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="设备模板"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWord(value.trim());
          },
        }}
        buttons={[
          <CreateTemplateButton key="create" onSuccess={handleCreateSuccess} />,
        ]}
      />
    </Flex>
  );
}

export default Index;
