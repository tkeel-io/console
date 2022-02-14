import CaretRight from '@/tkeel-console-icons/assets/icons/filled/caret-right.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CaretRightFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={CaretRight} />;
}

export default CaretRightFilledIcon;
