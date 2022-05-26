import { Box, Heading, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import {
  SegmentedControl,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';

const options = [
  { value: 'a', label: 'aaa' },
  { value: 'b', label: 'bbb' },
  { value: 'c', label: 'ccc', isDisabled: true },
];

export default function Index() {
  return (
    <Box>
      <Box>
        <Heading>SegmentedControlTab</Heading>
        <Tabs>
          <SegmentedControlTabList>
            <SegmentedControlTab>aaa</SegmentedControlTab>
            <SegmentedControlTab>bbb</SegmentedControlTab>
            <SegmentedControlTab isDisabled>ccc</SegmentedControlTab>
          </SegmentedControlTabList>
          <TabPanels>
            <TabPanel>111</TabPanel>
            <TabPanel>222</TabPanel>
            <TabPanel>333</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box>
        <Heading>SegmentedControl</Heading>
        <SegmentedControl defaultValue="b" options={options} />
      </Box>
    </Box>
  );
}
