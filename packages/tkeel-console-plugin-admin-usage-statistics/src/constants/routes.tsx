import Api from '../pages/Api';
import Message from '../pages/Message';
import Overview from '../pages/Overview';
import Usage from '../pages/Usage';

export const ROUTES = [
  {
    value: 'overview',
    label: '概览',
    element: <Overview />,
  },
  {
    value: 'message',
    label: '消息数据统计',
    element: <Message />,
  },
  {
    value: 'usage',
    label: '使用数据统计',
    element: <Usage />,
  },
  {
    value: 'api',
    label: 'API 调用统计',
    element: <Api />,
  },
];
