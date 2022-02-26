import { TreeSelect } from '@tkeel/console-components';

const treeData = [
  {
    value: '0-0',
    title: 'Node1',
    children: [
      {
        value: '0-0-1',
        title: 'Child Node1',
      },
      {
        value: '0-0-2',
        title: 'Child Node2',
      },
    ],
  },
  {
    value: '0-1',
    title: 'Node2',
  },
];

export default function TreeSelectExample() {
  return (
    <div>
      <TreeSelect
        style={{ width: '100%' }}
        // value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
      />
    </div>
  );
}
