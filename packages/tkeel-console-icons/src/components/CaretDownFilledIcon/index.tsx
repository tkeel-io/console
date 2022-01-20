import CaretDown from '@/tkeel-console-icons/assets/icons/filled/caret-down.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CaretDownFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={CaretDown} />;
}

export default CaretDownFilledIcon;
