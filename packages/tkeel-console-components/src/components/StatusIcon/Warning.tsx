import { useStatusColors } from '@tkeel/console-hooks';
import { WarningTwoToneIcon } from '@tkeel/console-icons';

import { Props } from './types';

export default function Warning({ size, color, twoToneColor }: Props) {
  const { warning } = useStatusColors();

  return (
    <WarningTwoToneIcon
      size={size}
      color={color ?? warning.secondary}
      twoToneColor={twoToneColor ?? warning.primary}
    />
  );
}
