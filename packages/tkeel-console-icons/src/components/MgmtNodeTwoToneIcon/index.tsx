import SvgComponent from '@/tkeel-console-icons/assets/icons/two-tone/mgmt_node_2.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MgmtNodeTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={SvgComponent} />;
}

export default MgmtNodeTwoToneIcon;
