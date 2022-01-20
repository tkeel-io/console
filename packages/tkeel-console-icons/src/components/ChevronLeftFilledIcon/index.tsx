import ChevronLeft from '@/tkeel-console-icons/assets/icons/filled/chevron-left.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ChevronLeftFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronLeft} />;
}

export default ChevronLeftFilledIcon;
