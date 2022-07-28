import type { ButtonProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { device } from '@tkeel/console-utils';

import LinkButton from '../Button/LinkButton';

interface Props extends ButtonProps {
  id: string;
  children: ReactNode;
}

export default function NavigateToDeviceDetailInOtherPlugins({
  id,
  children,
  ...rest
}: Props) {
  return (
    <LinkButton
      onClick={() => device.navigateToDeviceDetailInOtherPlugins({ id })}
      {...rest}
    >
      {children}
    </LinkButton>
  );
}
