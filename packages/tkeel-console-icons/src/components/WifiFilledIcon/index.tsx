import Wifi from '@/tkeel-console-icons/assets/icons/filled/wifi.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function WifiFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Wifi} />;
}

export default WifiFilledIcon;
