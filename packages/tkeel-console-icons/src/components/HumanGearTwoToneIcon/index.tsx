import HumanGear from '@/tkeel-console-icons/assets/icons/two-tone/human-gear.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function HumanGearTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={HumanGear} />;
}

export default HumanGearTwoToneIcon;
