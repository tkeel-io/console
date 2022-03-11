import { useStatusInfos } from '@tkeel/console-hooks';
import { SuccessTwoToneIcon, TwoToneIconProps } from '@tkeel/console-icons';

export default function Success({
  size,
  color,
  twoToneColor,
}: TwoToneIconProps) {
  const { success } = useStatusInfos();

  return (
    <SuccessTwoToneIcon
      size={size}
      color={color ?? success.colors.secondary}
      twoToneColor={twoToneColor ?? success.colors.primary}
    />
  );
}
