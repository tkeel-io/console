import HumanVip from '@/tkeel-console-icons/assets/icons/filled/human-vip.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function HumanVipFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={HumanVip} />;
}

export default HumanVipFilledIcon;
