import { ReactNode } from 'react';

import { InfoCard } from '@tkeel/console-components';

export interface Basic {
  label: string;
  value: ReactNode;
}

type Props = {
  basic: Basic[];
};

function DeviceBasicInfoCard({ basic }: Props) {
  return (
    <InfoCard
      data={basic}
      styles={{
        wrapper: {
          bg: 'white',
          w: '100%',
          minHeight: '108px',
        },
      }}
    />
  );
}

export default DeviceBasicInfoCard;
