import { Box } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { Empty, Loading, Tree } from '@tkeel/console-components';
import { TelemetryFields } from '@tkeel/console-request-hooks';

type Props = {
  telemetry: TelemetryFields;
  checkedKeys: string[];
  setCheckedKeys: Dispatch<SetStateAction<string[]>>;
  isDeviceDetailLoading: boolean;
};

export default function TemplateDataCheckboxes({
  telemetry,
  checkedKeys,
  setCheckedKeys,
  isDeviceDetailLoading,
}: Props) {
  const telemetryKeys = Object.keys(telemetry);

  const children = telemetryKeys.map((key) => ({
    title: telemetry[key].name,
    id: key,
    key,
  }));

  const treeData = [
    {
      title: '遥测数据',
      id: 'telemetryData',
      key: 'telemetryData',
      children,
    },
  ];

  if (isDeviceDetailLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }

  if (children.length === 0) {
    return <Empty type="component" sx={{ flex: '1' }} />;
  }

  return (
    <Box flex="1" padding="10px 20px">
      <Tree
        treeData={treeData}
        checkable
        defaultExpandAll
        checkedKeys={checkedKeys}
        selectable={false}
        onCheck={(keys) => {
          const checkedNodeKeys = (keys as string[]).filter(
            (key) => key !== 'telemetryData'
          );
          setCheckedKeys(checkedNodeKeys);
        }}
      />
    </Box>
  );
}
