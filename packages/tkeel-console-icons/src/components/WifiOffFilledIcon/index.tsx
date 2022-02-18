import WifiOff from '@/tkeel-console-icons/assets/icons/filled/wifi-off.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function WifiOffFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={WifiOff} />;
}

export default WifiOffFilledIcon;
