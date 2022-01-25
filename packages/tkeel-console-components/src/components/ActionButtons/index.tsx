import { ReactNode } from 'react';

import { LinkButton } from '@/tkeel-console-components/components/Button';
import LinkButtonsWrapper from '@/tkeel-console-components/components/LinkButtonsWrapper';

interface Button {
  key: string | number;
  children: ReactNode;
  onClick: (arg: unknown) => unknown;
}

interface Props {
  variant: 'link';
  data: Button[];
}

function ActionButtons({ variant, data }: Props) {
  if (variant === 'link') {
    return (
      <LinkButtonsWrapper>
        {data.map(({ key, children, onClick }) => (
          <LinkButton key={key} onClick={onClick}>
            {children}
          </LinkButton>
        ))}
      </LinkButtonsWrapper>
    );
  }

  return null;
}

export default ActionButtons;
