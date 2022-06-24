import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';

import {
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';

type Props = {
  onClick: (e: number) => unknown;
};

export default function TabsComponent({ onClick }: Props) {
  const tabArrInfo = [
    {
      key: '1',
      name: '全部',
      keyWords: 0,
      active: true,
    },
    {
      key: '2',
      name: '消息路由',
      keyWords: 1,
      active: false,
    },
    {
      key: '3',
      name: '时序路由',
      keyWords: 2,
      active: false,
    },
  ];
  const [tabArr, setTabArr] = useState(tabArrInfo);

  return (
    <Tabs>
      <SegmentedControlTabList sx={{ margin: '10px 0', width: 'max-content' }}>
        {tabArr.map((item, index) => (
          <SegmentedControlTab
            key={item.key}
            onClick={() => {
              const newTabArr = tabArr.map((tab, i) => {
                tabArr[i].active = i === index;
                return tab;
              });
              setTabArr(newTabArr);
              onClick(item.keyWords);
            }}
          >
            {item.name}
          </SegmentedControlTab>
        ))}
      </SegmentedControlTabList>
    </Tabs>
  );
}
