import SvgComponent from '@/tkeel-console-icons/assets/icons/two-tone/role.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function RoleTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={SvgComponent} />;
}

export default RoleTwoToneIcon;
