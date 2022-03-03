import { Dispatch, SetStateAction } from 'react';

import { TreeNodeType } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';
import { DeviceItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import { Template } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';

import DeviceGroup from '../DeviceGroup';
import DeviceList from '../DeviceList';
import DeviceListTitle from '../DeviceListTitle';
import DeviceTemplates, { OnTemplateClick } from '../DeviceTemplates';
import Empty from '../Empty';
import Label from '../Label';
import ListWrapper from '../ListWrapper';
import { StatusSelectProps } from '../StatusSelect';

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
  setShowDeviceList: Dispatch<SetStateAction<boolean>>;
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
  setShowDeviceList,
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
          onBackBtnClick={() => {
            setShowDeviceList(false);
          }}
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

  return <Empty />;
}

export default ResultContent;
