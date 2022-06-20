import type { StyleProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';

import Background from './background.svg?svgr';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export const sx: StyleProps = {
  position: 'relative',
  display: 'flex',
  flex: '1',
  height: '108px',
  padding: '28px 32px 20px 32px',
};

export default function DeviceBox({ children, onClick }: Props) {
  return (
    <BaseBox sx={sx} onClick={onClick}>
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
