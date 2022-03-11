import { useStatusColors } from '@tkeel/console-hooks';
import { InformationTwoToneIcon } from '@tkeel/console-icons';

import { Props } from './types';

export default function Info({ size, color, twoToneColor }: Props) {
  const { info } = useStatusColors();

  return (
    <InformationTwoToneIcon
      size={size}
      color={color ?? info.secondary}
      twoToneColor={twoToneColor ?? info.primary}
    />
  );
}
