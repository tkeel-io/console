import Broom from '@/tkeel-console-icons/assets/icons/filled/broom.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function BroomFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Broom} />;
}

export default BroomFilledIcon;
