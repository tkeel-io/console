import { ReactNode } from 'react';

import { InfoCard } from '@tkeel/console-components';

import { FluxSwitchValue } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import NetProxyItem from './NetProxyItem';

export interface ProxyData {
  label: string;
  value: ReactNode;
}

interface Props {
  proxyInfo: FluxSwitchValue[];
}

function DeviceNetProxyInfoCard({ proxyInfo }: Props) {
  const proxyData = proxyInfo.map((item) => {
    return {
      label: item.title,
      value: <NetProxyItem proxyItem={item} />,
    };
  });

  return (
    <InfoCard
      data={proxyData}
      title="代理信息"
      styles={{
        wrapper: {
          bg: 'white',
          w: '100%',
        },
      }}
    />
  );
}

export default DeviceNetProxyInfoCard;
