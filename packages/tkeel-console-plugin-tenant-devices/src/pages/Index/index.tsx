import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components/';
import { AddFilledIcon } from '@tkeel/console-icons';

const handleSearchDevice = (keyword: string) => {
  // eslint-disable-next-line no-console
  console.log(keyword);
};
function Index(): JSX.Element {
  return (
    <Flex>
      <Heading as="h3" fontSize="14px" lineHeight="24px">
        设备列表
      </Heading>
      <Spacer />
      <SearchInput onSearch={handleSearchDevice} />
      <Button
        colorScheme="primary"
        height="32px"
        fontSize="12px"
        leftIcon={<AddFilledIcon color="white" />}
      >
        添加设备
      </Button>
    </Flex>
  );
}

export default Index;
