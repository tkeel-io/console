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
      <Select
        placeholder="父设备组"
        allowClear
        style={{ width: '300px' }}
        // open
      >
        <Select.Option value="1">1只小鸭子</Select.Option>
        <Select.Option value="2">2只小白兔</Select.Option>
        <Select.Option value="3">3朵玫瑰花</Select.Option>
      </Select>
      <Tree treeData={treeData} />
      <TreeSelect
        // open
        style={{ width: '400px' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        multiple
        treeCheckable
      />
    </HStack>
  );
}
