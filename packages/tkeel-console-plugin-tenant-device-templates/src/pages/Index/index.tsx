import { Flex } from '@chakra-ui/react';
import { CreateTemplateButton } from 'packages/tkeel-console-plugin-tenant-device-templates/src/components/buttons';
import { useState } from 'react';

import { PageHeaderToolbar, toast } from '@tkeel/console-components';
// import useTemplatesQuery from '@/tkeel-console-plugin-tenant-device-template/hooks/queries/useTemplatesQuery';

function Index(): JSX.Element {
  // const result = useTemplatesQuery();
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
