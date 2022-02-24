import Refresh from '@/tkeel-console-icons/assets/icons/filled/refresh.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function RefreshFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Refresh} />;
}

export default RefreshFilledIcon;
