import { useStatusInfos } from '@tkeel/console-hooks';
import { TwoToneIconProps, WarningTwoToneIcon } from '@tkeel/console-icons';

export default function Warning({
  size,
  color,
  twoToneColor,
}: TwoToneIconProps) {
  const { warning } = useStatusInfos();

  return (
    <WarningTwoToneIcon
      size={size}
      color={color ?? warning.colors.secondary}
      twoToneColor={twoToneColor ?? warning.colors.primary}
    />
  );
}
