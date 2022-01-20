import AppsAdd from '@/tkeel-console-icons/assets/icons/filled/apps-add.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function AppsAddFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={AppsAdd} />;
}

export default AppsAddFilledIcon;
