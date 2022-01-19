import { Flex } from '@chakra-ui/react';
import { PageHeaderToolbar } from '@tkeel/console-components';

function Index(): JSX.Element {
  return (
    <Flex>
      <PageHeaderToolbar name="用户管理" />
    </Flex>
  );
}

export default Index;
