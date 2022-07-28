import type { ReactNode } from 'react';

import { device } from '@tkeel/console-utils';

import LinkButton from '../Button/LinkButton';

interface Props {
  id: string;
  children: ReactNode;
}

export default function NavigateToDeviceDetailInOtherPlugins({
  id,
  children,
}: Props) {
  return (
    <LinkButton
      onClick={() => device.navigateToDeviceDetailInOtherPlugins({ id })}
    >
      {children}
    </LinkButton>
  );
}
