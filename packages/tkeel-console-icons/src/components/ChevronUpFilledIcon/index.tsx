import ChevronUp from '@/tkeel-console-icons/assets/icons/filled/chevron-up.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ChevronUpFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronUp} />;
}

export default ChevronUpFilledIcon;
