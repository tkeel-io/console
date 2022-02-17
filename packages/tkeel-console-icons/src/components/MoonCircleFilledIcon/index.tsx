import MoonCircle from '@/tkeel-console-icons/assets/icons/filled/moon-circle.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MoonCircleFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={MoonCircle} />;
}

export default MoonCircleFilledIcon;
