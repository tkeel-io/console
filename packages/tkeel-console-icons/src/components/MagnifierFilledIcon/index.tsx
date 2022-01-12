import Magnifier from '@/tkeel-console-icons/assets/icons/filled/magnifier.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MagnifierFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Magnifier} />;
}

export default MagnifierFilledIcon;
