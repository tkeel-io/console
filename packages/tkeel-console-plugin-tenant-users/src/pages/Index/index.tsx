import { Flex } from '@chakra-ui/react';
import { CreateButton, PageHeaderToolbar } from '@tkeel/console-components';

function Index(): JSX.Element {
  return (
    <Flex>
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        searchInputProps={{ onSearch() {} }}
        buttons={[<CreateButton key="add">创建用户</CreateButton>]}
      />
    </Flex>
  );
}

export default Index;
