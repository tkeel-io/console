import Overview from '../pages/Overview';

export const ROUTES = [
  {
    value: 'overview',
    label: '概览',
    element: <Overview />,
  },
  {
    value: 'message',
    label: '消息数据统计',
    element: <Overview />,
  },
  {
    value: 'usage',
    label: '使用数据统计',
    element: <Overview />,
  },
  {
    value: 'api',
    label: 'API 调用统计',
    element: <Overview />,
  },
];
