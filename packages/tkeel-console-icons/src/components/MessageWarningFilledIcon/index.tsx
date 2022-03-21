import SvgComponent from '@/tkeel-console-icons/assets/icons/filled/message-warning.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MessageWarningFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={SvgComponent} />;
}

export default MessageWarningFilledIcon;
