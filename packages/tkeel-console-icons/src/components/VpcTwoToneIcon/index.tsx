import Vpc from '@/tkeel-console-icons/assets/icons/two-tone/vpc.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function AppsTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Vpc} />;
}

export default AppsTwoToneIcon;
