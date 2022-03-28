import SvgComponent from '@/tkeel-console-icons/assets/icons/two-tone/duotone.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function DuotoneTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={SvgComponent} />;
}

export default DuotoneTwoToneIcon;
