import ProtocolSsh from '@/tkeel-console-icons/assets/icons/filled/protocol-ssh.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ProtocolSshFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ProtocolSsh} />;
}

export default ProtocolSshFilledIcon;
