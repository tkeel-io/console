import Crowd from '@/tkeel-console-icons/assets/icons/two-tone/crowd.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CrowdTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Crowd} />;
}

export default CrowdTwoToneIcon;
