import Sun from '@/tkeel-console-icons/assets/icons/filled/sun.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function SunFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Sun} />;
}

export default SunFilledIcon;
