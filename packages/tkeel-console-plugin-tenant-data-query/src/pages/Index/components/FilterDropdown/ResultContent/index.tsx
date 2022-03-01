import { TreeNodeType } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';
import { DeviceItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';

import DeviceGroup from '../DeviceGroup';
import DeviceList from '../DeviceList';
import DeviceListTitle from '../DeviceListTitle';
import DeviceTemplates from '../DeviceTemplates';
import Empty from '../Empty';
import Label from '../Label';
import ListWrapper from '../ListWrapper';
import { StatusSelectProps } from '../StatusSelect';

type Props = StatusSelectProps & {
  showDeviceGroup: boolean;
  isDeviceGroupLoading: boolean;
  deviceGroupTree: TreeNodeType;
  setDeviceId: (deviceId: string) => unknown;
  showDeviceList: boolean;
  isDeviceListLoading: boolean;
  deviceList: DeviceItem[];
  showDeviceTemplates: boolean;
  isDeviceTemplatesLoading: boolean;
};

function ResultContent({
  status,
  onStatusChange,
  showDeviceGroup,
  isDeviceGroupLoading,
  deviceGroupTree,
  setDeviceId,
  showDeviceList,
  isDeviceListLoading,
  deviceList,
  showDeviceTemplates,
  isDeviceTemplatesLoading,
}: Props) {
  if (showDeviceList) {
    return (
      <>
        <DeviceListTitle
          resultNum={deviceList.length}
          status={status}
          onStatusChange={onStatusChange}
          onBackBtnClick={() => setDeviceId('')}
        />
        <ListWrapper
          loading={isDeviceListLoading}
          content={<DeviceList data={deviceList} />}
        />
      </>
    );
  }

  if (showDeviceGroup) {
    return (
      <>
        <Label>搜索结果</Label>
        <ListWrapper
          loading={isDeviceGroupLoading}
          content={
            <DeviceGroup
              deviceGroupTree={deviceGroupTree}
              onClick={() => {}}
              onSpreadClick={setDeviceId}
            />
          }
        />
      </>
    );
  }

  if (showDeviceTemplates) {
    return (
      <>
        <Label>搜索结果</Label>
        <ListWrapper
          loading={isDeviceTemplatesLoading}
          content={<DeviceTemplates />}
        />
      </>
    );
  }

  return <Empty />;
}

export default ResultContent;
