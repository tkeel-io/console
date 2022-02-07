import Success from '@/tkeel-console-icons/assets/icons/two-tone/success.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function SuccessTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Success} />;
}

export default SuccessTwoToneIcon;
