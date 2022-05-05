import { DeviceItem, TreeNodeType } from '@tkeel/console-request-hooks';

import SearchEmpty from '@/tkeel-console-plugin-tenant-data-query/components/SearchEmpty';
import { StatusSelectProps } from '@/tkeel-console-plugin-tenant-data-query/components/StatusSelect';
import { Template } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';

import DeviceGroup from '../DeviceGroup';
import DeviceList from '../DeviceList';
import DeviceListTitle from '../DeviceListTitle';
import DeviceTemplates, { OnTemplateClick } from '../DeviceTemplates';
import Label from '../Label';
import ListWrapper from '../ListWrapper';

type Props = StatusSelectProps & {
  type: 'index' | 'searchResult';
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
  type,
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
  const isShowSpreadButton = type === 'index';
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
              isShowSpreadButton={isShowSpreadButton}
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
              isShowSpreadButton={isShowSpreadButton}
              templates={templates}
              onTemplateClick={onTemplateClick}
            />
          }
        />
      </>
    );
  }

  return <SearchEmpty styles={{ wrapper: { flex: '1' } }} />;
}

export default ResultContent;
