import type { Colors } from '@tkeel/console-themes';

import type { PodStatus } from '../types';

interface PodStatusInfo {
  value: string;
  label: string;
  color: string;
  boxShadow: string;
}

interface PodStatusInfoMap {
  Running: PodStatusInfo;
  Pending: PodStatusInfo;
  Succeeded: PodStatusInfo;
  Failed: PodStatusInfo;
  Unknown: PodStatusInfo;
}

export function getPodStatusInfos(options?: { colors?: Colors }) {
  const colors = options?.colors;

  return [
    {
      value: 'Running',
      label: '运行中',
      color: colors?.green[500],
      boxShadow: '0px 0px 4px rgba(85, 188, 138, 0.4);',
    },
    {
      value: 'Pending',
      label: '等待中',
      color: colors?.orange[300],
      boxShadow: '0px 0px 4px rgba(245, 166, 35, 0.4);',
    },
    {
      value: 'Succeeded',
      label: '成功',
      color: colors?.green[300],
      boxShadow: '0px 0px 4px rgba(103, 194, 58, 0.4)',
    },
    {
      value: 'Failed',
      label: '失败',
      color: colors?.red[300],
      boxShadow: '0px 0px 4px rgba(202, 38, 33, 0.4);',
    },
    {
      value: 'Unknown',
      label: '未知状态',
      color: colors?.purple[400],
      boxShadow: '0px 0px 4px rgba(159, 122, 234, 0.4);',
    },
  ];
}

export const DEFAULT_POD_STATUS = 'Unknown';

export function getPodStatusInfoMap(options?: { colors?: Colors }) {
  const colors = options?.colors;
  const infos = getPodStatusInfos({ colors });
  const map = {} as PodStatusInfoMap;

  infos.forEach((info) => {
    const { value } = info;
    map[value] = info;
  });

  return map;
}

export function getPodStatusInfo({
  status,
  colors,
}: {
  status: PodStatus;
  colors?: Colors;
}) {
  const map = getPodStatusInfoMap({ colors });
  const info = map[status];
  const defaultInfo = map[DEFAULT_POD_STATUS];

  return info ?? defaultInfo;
}
