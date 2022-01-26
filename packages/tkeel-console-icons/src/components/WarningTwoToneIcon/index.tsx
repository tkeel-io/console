import Warning from '@/tkeel-console-icons/assets/icons/two-tone/warning.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function WarningTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Warning} />;
}

export default WarningTwoToneIcon;
