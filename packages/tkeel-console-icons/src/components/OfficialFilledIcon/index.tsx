import Official from '@/tkeel-console-icons/assets/icons/filled/official-icon.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function OfficialFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Official} />;
}

export default OfficialFilledIcon;
