import { TabList, TabListProps } from '@chakra-ui/react';

export default function SegmentedControl(props: TabListProps) {
  return (
    <TabList
      display="inline-flex"
      borderRadius="16px"
      border="1px solid"
      borderTopColor="gray.200"
      borderRightColor="gray.200"
      borderBottomColor="gray.200"
      borderLeftColor="gray.200"
      padding="2px"
      backgroundColor="gray.50"
      {...props}
    />
  );
}
