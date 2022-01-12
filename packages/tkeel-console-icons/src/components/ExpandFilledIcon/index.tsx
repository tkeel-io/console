import Expand from '@/tkeel-console-icons/assets/icons/filled/expand.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ExpandFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Expand} />;
}

export default ExpandFilledIcon;
