import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { PageHeaderToolbar, toast } from '@tkeel/console-components';

// import useTemplatesQuery from '@/tkeel-console-plugin-tenant-device-template/hooks/queries/useTemplatesQuery';
import useTemplatesQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useTemplatesQuery';

import { CreateTemplateButton } from './components/buttons';

function Index(): JSX.Element {
  // const result = useTemplatesQuery();
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

  const { items } = useTemplatesQuery(defaultParams);
  // eslint-disable-next-line no-console
  console.log('Index ~ items', items);

  const [keyWord, setKeyWord] = useState('');
  // eslint-disable-next-line no-console
  console.log(keyWord);
  // console.log(keyWord, result);

  const handleCreateSuccess = () => {
    toast({ status: 'warning', title: '请选择角色权限' });
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
