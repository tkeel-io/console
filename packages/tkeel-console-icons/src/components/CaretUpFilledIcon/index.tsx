import CaretUp from '@/tkeel-console-icons/assets/icons/filled/caret_up.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CaretUpFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={CaretUp} />;
}

export default CaretUpFilledIcon;
