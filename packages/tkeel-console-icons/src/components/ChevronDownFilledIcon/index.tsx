import ChevronDown from '@/tkeel-console-icons/assets/icons/filled/chevron-down.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ChevronDownFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronDown} />;
}

export default ChevronDownFilledIcon;
