import { TreeSelect } from '@tkeel/console-components';

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
    <div>
      <TreeSelect
        style={{ width: '400px' }}
        // value={this.state.value}
        className="cba bbb"
        dropdownClassName="abc aaa"
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        treeCheckable
        multiple
      />
      {/* <Tree treeData={treeData} checkable multiple /> */}
    </div>
  );
}
