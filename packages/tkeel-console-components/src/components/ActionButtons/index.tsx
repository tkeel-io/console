import { ReactNode } from 'react';

import { LinkButton } from '@/tkeel-console-components/components/Button';
import ButtonsHStack from '@/tkeel-console-components/components/ButtonsHStack';

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
      <ButtonsHStack>
        {data.map(({ key, children, onClick }) => (
          <LinkButton key={key} onClick={onClick}>
            {children}
          </LinkButton>
        ))}
      </ButtonsHStack>
    );
  }

  return null;
}

export default ActionButtons;
