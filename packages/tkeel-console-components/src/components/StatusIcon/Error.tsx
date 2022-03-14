import { useStatusInfos } from '@tkeel/console-hooks';
import { ErrorTwoToneIcon, TwoToneIconProps } from '@tkeel/console-icons';

export default function Error({ size, color, twoToneColor }: TwoToneIconProps) {
  const { error } = useStatusInfos();

  return (
    <ErrorTwoToneIcon
      size={size}
      color={color ?? error.colors.secondary}
      twoToneColor={twoToneColor ?? error.colors.primary}
    />
  );
}
