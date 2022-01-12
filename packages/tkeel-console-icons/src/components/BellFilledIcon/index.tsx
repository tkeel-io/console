import Bell from '@/tkeel-console-icons/assets/icons/filled/bell.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function BellFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Bell} />;
}

export default BellFilledIcon;
