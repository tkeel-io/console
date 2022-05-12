export const PLUGIN_STATUS_MAP = {
  running: {
    label: '运行中',
    color: '',
  },
  updating: {
    label: '更新中',
    color: '',
  },
  stopped: {
    label: '已停止',
    color: '',
  },
};

export const PLUGIN_STATUSES = Object.entries(PLUGIN_STATUS_MAP).map(
  ([value, rest]) => ({ value, ...rest })
);
