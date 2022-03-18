import { BasicInfo } from '@tkeel/console-business-components';
import { MoreAction } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import {
  InstallButton,
  UninstallButton,
} from '@/tkeel-console-plugin-admin-plugins/components';
import { Installer } from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';
import { PluginState } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

type Props = {
  data: Installer | undefined;
  refetchDetails: () => unknown;
};

function BasicInfoCard({ data, refetchDetails }: Props) {
  const name = data?.name ?? '';
  const repo = data?.repo ?? '';
  const version = data?.version ?? '';
  const basicInfoList = [
    {
      label: '插件源',
      value: repo,
    },
    {
      label: '标签',
      value: data?.annotations?.['tkeel.io/tag'] ?? '',
    },
    {
      label: '版本',
      value: version,
    },
    {
      label: '更新时间',
      value: data?.timestamp
        ? formatDateTimeByTimestamp({ timestamp: `${data.timestamp}000` })
        : '',
    },
  ];

  const installPluginInfo = {
    name,
    version,
    repo,
    state: data?.state || ('UNINSTALLED' as PluginState),
  };

  let rightTopButton = null;
  if (data) {
    const { state } = data;
    rightTopButton =
      state === 'INSTALLED' ? (
        <MoreAction
          buttons={[
            <UninstallButton
              key="delete"
              pluginName={data.name}
              onSuccess={refetchDetails}
            />,
          ]}
        />
      ) : (
        <InstallButton
          installPluginInfo={installPluginInfo}
          onSuccess={refetchDetails}
        />
      );
  }

  return (
    <BasicInfo
      icon={data?.icon || 'BoxTwoToneIcon'}
      rightTopButton={rightTopButton}
      name={name}
      desc={data?.desc ?? ''}
      basicInfoList={basicInfoList}
    />
  );
}

export default BasicInfoCard;
