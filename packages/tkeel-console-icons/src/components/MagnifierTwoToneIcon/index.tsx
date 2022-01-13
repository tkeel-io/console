import Magnifier from '@/tkeel-console-icons/assets/icons/two-tone/magnifier.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MagnifierTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Magnifier} />;
}

export default MagnifierTwoToneIcon;
