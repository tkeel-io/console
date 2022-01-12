import Add from '@/tkeel-console-icons/assets/icons/filled/add.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function AddFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Add} />;
}

export default AddFilledIcon;
