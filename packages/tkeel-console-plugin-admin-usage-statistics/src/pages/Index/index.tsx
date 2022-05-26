import { Box, Flex } from '@chakra-ui/react';
import { Link, Route, Routes } from 'react-router-dom';

import { PageHeader, SegmentedControl } from '@tkeel/console-components';
import { ServerNodeTwoToneIcon } from '@tkeel/console-icons';

import Overview from '../Overview';

const OPTIONS = [
  {
    value: 'overview',
    label: <Link to="/">概览</Link>,
    path: '',
    element: <Overview />,
  },
  {
    value: 'message',
    label: <Link to="/message">消息数据统计</Link>,
    path: 'message',
    element: <Overview />,
  },
  {
    value: 'usage',
    label: <Link to="/usage">使用数据统计</Link>,
    path: 'usage',
    element: <Overview />,
  },
  {
    value: 'api',
    label: <Link to="/api">API 调用统计</Link>,
    path: 'api',
    element: <Overview />,
  },
];

export default function Index() {
  // TODO: need docs

  return (
    <Flex flexDirection="column" flex="1" overflowY="hidden">
      <PageHeader
        icon={<ServerNodeTwoToneIcon />}
        name="用量统计"
        desc="了解资源使用情况，查询实时性能指标"
      />
      <Box padding="12px 0 14px">
        <SegmentedControl options={OPTIONS} defaultValue={OPTIONS[0].value} />
      </Box>
      <Box flex="1" overflowY="auto">
        <Routes>
          {OPTIONS.map(({ value, path, element }) => (
            <Route key={value} path={path} element={element} />
          ))}
        </Routes>
      </Box>
    </Flex>
  );
}
