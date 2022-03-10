import { useStatusColors } from '@tkeel/console-hooks';
import { ErrorTwoToneIcon } from '@tkeel/console-icons';

import { Props } from './types';

export default function Error({ size, color, twoToneColor }: Props) {
  const { error } = useStatusColors();

  return (
    <ErrorTwoToneIcon
      size={size}
      color={color ?? error.colors.secondary}
      twoToneColor={twoToneColor ?? error.colors.primary}
    />
  );
}
