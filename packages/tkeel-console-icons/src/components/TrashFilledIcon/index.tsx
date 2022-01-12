import Trash from '@/tkeel-console-icons/assets/icons/filled/trash.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function TrashFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Trash} />;
}

export default TrashFilledIcon;
