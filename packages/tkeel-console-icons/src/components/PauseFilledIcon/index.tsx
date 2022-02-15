import Pause from '@/tkeel-console-icons/assets/icons/filled/pause.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function PauseFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Pause} />;
}

export default PauseFilledIcon;
