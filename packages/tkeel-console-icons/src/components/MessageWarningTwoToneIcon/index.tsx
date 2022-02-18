import SvgComponent from '@/tkeel-console-icons/assets/icons/two-tone/message-warning.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function MessageWarningTwoToneIcon(props: FilledIconProps) {
  return <TwoToneIcon {...props} svgComponent={SvgComponent} />;
}

export default MessageWarningTwoToneIcon;
