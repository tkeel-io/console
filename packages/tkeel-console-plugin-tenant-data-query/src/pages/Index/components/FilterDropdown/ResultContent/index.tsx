import SearchEmpty from '@/tkeel-console-plugin-tenant-data-query/components/SearchEmpty';
import { StatusSelectProps } from '@/tkeel-console-plugin-tenant-data-query/components/StatusSelect';
import { TreeNodeType } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';
import { DeviceItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import { Template } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';

import DeviceGroup from '../DeviceGroup';
import DeviceList from '../DeviceList';
import DeviceListTitle from '../DeviceListTitle';
import DeviceTemplates, { OnTemplateClick } from '../DeviceTemplates';
import Label from '../Label';
import ListWrapper from '../ListWrapper';

type Props = StatusSelectProps & {
  showDeviceGroup: boolean;
  isDeviceGroupLoading: boolean;
  deviceGroupTree: TreeNodeType;
  // clearDeviceGroupId: () => unknown;
  // clearTemplateId: () => unknown;
  showBackButton: boolean;
  showDeviceList: boolean;
  isDeviceListLoading: boolean;
  deviceList: DeviceItem[];
  onDeviceListBackBtnClick: () => unknown;
  onTemplateClick: OnTemplateClick;
  showDeviceTemplates: boolean;
  templates: Template[];
  isDeviceTemplatesLoading: boolean;
  onDeviceGroupTitleClick: ({
    groupId,
    title,
  }: {
    groupId: string;
    title: string;
  }) => unknown;
};

function ResultContent({
  status,
  onStatusChange,
  showDeviceGroup,
  isDeviceGroupLoading,
  deviceGroupTree,
  // clearDeviceGroupId,
  // clearTemplateId,
  showBackButton,
  showDeviceList,
  isDeviceListLoading,
  deviceList,
  onDeviceListBackBtnClick,
  onTemplateClick,
  showDeviceTemplates,
  templates,
  isDeviceTemplatesLoading,
  onDeviceGroupTitleClick,
}: Props) {
  if (showDeviceList) {
    return (
      <>
        <DeviceListTitle
          resultNum={deviceList.length}
          status={status}
          showBackButton={showBackButton}
          onStatusChange={onStatusChange}
          onBackBtnClick={onDeviceListBackBtnClick}
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
              onNodeTitleClick={onDeviceGroupTitleClick}
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
          content={
            <DeviceTemplates
              templates={templates}
              onTemplateClick={onTemplateClick}
            />
          }
        />
      </>
    );
  }

  return <SearchEmpty />;
}

export default ResultContent;
