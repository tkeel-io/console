import { HStack } from '@chakra-ui/react';

import { Select, Tree, TreeSelect } from '@tkeel/console-components';

const treeData = [
  {
    key: '0-0',
    value: '0-0',
    title: 'Node1',
    children: [
      {
        key: '0-0-1',
        value: '0-0-1',
        title: 'Child Node1',
      },
      {
        key: '0-0-2',
        value: '0-0-2',
        title: 'Child Node2',
      },
    ],
  },
  {
    key: '0-1',
    value: '0-1',
    title: 'Node2',
  },
];

export default function TreeSelectExample() {
  return (
    <HStack spacing="32px">
      <TreeSelect
        style={{ width: '400px' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        // treeCheckable
      />
      <Select>
        <Select.Option>1</Select.Option>
        <Select.Option>2</Select.Option>
        <Select.Option>3</Select.Option>
      </Select>
    </HStack>
  );
}
