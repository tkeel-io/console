import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { PageHeaderToolbar } from '@tkeel/console-components';

import { CreateTemplateButton } from '@/tkeel-console-plugin-tenant-device-template/components/buttons';

function Index(): JSX.Element {
  // const result = useTemplatesQuery();
  const [keyWord, setKeyWord] = useState('');
  // eslint-disable-next-line no-console
  console.log(keyWord);

  const handleCreateSuccess = () => {
    // eslint-disable-next-line no-console
    console.log('67576');
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
