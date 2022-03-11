import { useStatusInfos } from '@tkeel/console-hooks';
import { InformationTwoToneIcon, TwoToneIconProps } from '@tkeel/console-icons';

export default function Info({ size, color, twoToneColor }: TwoToneIconProps) {
  const { info } = useStatusInfos();

  return (
    <InformationTwoToneIcon
      size={size}
      color={color ?? info.colors.secondary}
      twoToneColor={twoToneColor ?? info.colors.primary}
    />
  );
}
