import svgComponent from '@/tkeel-console-icons/assets/icons/two-tone/smart-object.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function BellTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={svgComponent} />;
}

export default BellTwoToneIcon;
