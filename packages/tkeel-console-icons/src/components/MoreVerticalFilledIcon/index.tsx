import MoreVertical from '@/tkeel-console-icons/assets/icons/filled/more-vertical.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MoreVerticalFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={MoreVertical} />;
}

export default MoreVerticalFilledIcon;
