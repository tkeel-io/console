import type { Colors } from '@tkeel/console-themes';

import type { PluginStatus } from '../types';

interface PluginStatusInfo {
  value: string;
  label: string;
  color: string;
}

interface PluginStatusInfoMap {
  running: PluginStatusInfo;
  updating: PluginStatusInfo;
  stopped: PluginStatusInfo;
}

export function getPluginStatusInfos(options?: { colors?: Colors }) {
  const colors = options?.colors;

  return [
    {
      value: 'running',
      label: '运行中',
      color: colors?.green[300],
    },
    {
      value: 'updating',
      label: '更新中',
      color: colors?.orange[300],
    },
    {
      value: 'stopped',
      label: '已停止',
      color: colors?.gray[300],
    },
  ];
}

export function getPluginStatusInfoMap(options?: { colors?: Colors }) {
  const colors = options?.colors;
  const infos = getPluginStatusInfos({ colors });
  const map = {} as PluginStatusInfoMap;

  infos.forEach((info) => {
    const { value } = info;
    map[value] = info;
  });

  return map;
}

export function getPluginStatusInfo({
  status,
  colors,
}: {
  status: PluginStatus;
  colors?: Colors;
}) {
  const map = getPluginStatusInfoMap({ colors });
  const info = map[status];
  const defaultInfo = { value: '', label: '', color: '' };

  return info ?? defaultInfo;
}
