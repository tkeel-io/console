import { ReactNode } from 'react';

import { LinkButton } from '@/tkeel-console-components/components/Button';
import ButtonsWrapper from '@/tkeel-console-components/components/ButtonsWrapper';

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
      <ButtonsWrapper>
        {data.map(({ key, children, onClick }) => (
          <LinkButton key={key} onClick={onClick}>
            {children}
          </LinkButton>
        ))}
      </ButtonsWrapper>
    );
  }

  return null;
}

export default ActionButtons;
