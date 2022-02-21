import DotLine from '@/tkeel-console-icons/assets/icons/filled/dot-line.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function DotLineFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={DotLine} />;
}

export default DotLineFilledIcon;
