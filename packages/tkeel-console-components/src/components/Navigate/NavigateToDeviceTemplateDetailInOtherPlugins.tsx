import type { ButtonProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { device } from '@tkeel/console-utils';

import LinkButton from '../Button/LinkButton';

interface Props extends ButtonProps {
  id: string;
  children: ReactNode;
}

export default function NavigateToDeviceTemplateDetailInOtherPlugins({
  id,
  children,
  ...rest
}: Props) {
  return (
    <LinkButton
      onClick={() =>
        device.navigateToDeviceTemplateDetailInOtherPlugins({ id })
      }
      {...rest}
    >
      {children}
    </LinkButton>
  );
}
