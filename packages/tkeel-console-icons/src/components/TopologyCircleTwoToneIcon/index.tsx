import TopologyCircle from '@/tkeel-console-icons/assets/icons/two-tone/topology-circle.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function TopologyCircleTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={TopologyCircle} />;
}

export default TopologyCircleTwoToneIcon;
