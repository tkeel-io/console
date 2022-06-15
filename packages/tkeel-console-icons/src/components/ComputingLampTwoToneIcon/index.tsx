import ComputingLamp from '@/tkeel-console-icons/assets/icons/two-tone/computing-lamp.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ComputingLampTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={ComputingLamp} />;
}

export default ComputingLampTwoToneIcon;
