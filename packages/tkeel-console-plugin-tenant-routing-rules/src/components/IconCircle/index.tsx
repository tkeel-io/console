import { Circle, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';

type Props = {
  children: ReactNode;
  active?: boolean;
  defaultBorderColor?: string;
  defaultBgColor?: string;
  defaultIconColor?: string;
  styles?: {
    wrapper?: StyleProps;
    backgroundCircle?: StyleProps;
  };
};

export default function IconCircle({
  children,
  active,
  defaultBorderColor = 'gray.800',
  defaultBgColor = 'gray.500',
  defaultIconColor = 'grayAlternatives.100',
  styles,
}: Props) {
  const fillColor = useColor(active ? 'primary' : defaultIconColor);

  return (
    <Circle
      position="relative"
      size="32px"
      border="1px"
      borderColor={active ? 'primary' : defaultBorderColor}
      css={`
        svg {
          position: relative;
          fill: ${`${fillColor} !important`};
        }
      `}
      {...styles?.wrapper}
    >
      <Circle
        position="absolute"
        size="30px"
        backgroundColor={active ? 'primary' : defaultBgColor}
        opacity={active ? '0.5' : '1'}
        {...styles?.wrapper}
      />
      {children}
    </Circle>
  );
}
