import type { ReactNode } from 'react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';

import Background from './background.svg?svgr';

interface Props {
  children: ReactNode;
}

export default function OverviewBox({ children }: Props) {
  return (
    <BaseBox
      sx={{
        position: 'relative',
        display: 'flex',
        flex: '1',
        height: '108px',
        padding: '28px 32px 20px 32px',
      }}
    >
      <Background
        width="100px"
        height="80px"
        fill="#324558"
        color="#b6c2cd"
        style={{ position: 'absolute', right: '0', bottom: '0' }}
      />
      {children}
    </BaseBox>
  );
}
