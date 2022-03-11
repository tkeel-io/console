import { useStatusColors } from '@tkeel/console-hooks';
import { SuccessTwoToneIcon } from '@tkeel/console-icons';

import { Props } from './types';

export default function Success({ size, color, twoToneColor }: Props) {
  const { success } = useStatusColors();

  return (
    <SuccessTwoToneIcon
      size={size}
      color={color ?? success.secondary}
      twoToneColor={twoToneColor ?? success.primary}
    />
  );
}
