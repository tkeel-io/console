import Check from '@/tkeel-console-icons/assets/icons/filled/check.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CheckFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Check} />;
}

export default CheckFilledIcon;
