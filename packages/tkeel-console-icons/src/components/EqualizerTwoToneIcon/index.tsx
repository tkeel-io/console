import Equalizer from '@/tkeel-console-icons/assets/icons/two-tone/equalizer.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function EqualizerTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Equalizer} />;
}

export default EqualizerTwoToneIcon;
