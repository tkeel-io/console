import { Flex, Tab, TabList } from '@chakra-ui/react';

export default function SegmentedControl() {
  return (
    <Flex as={TabList}>
      <Tab>1</Tab>
      <Tab>2</Tab>
      <Tab>3</Tab>
    </Flex>
  );
}
