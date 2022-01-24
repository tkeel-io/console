import Pencil from '@/tkeel-console-icons/assets/icons/filled/pencil.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function PencilFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Pencil} />;
}

export default PencilFilledIcon;
