import Close from '@/tkeel-console-icons/assets/icons/filled/close.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

export default function CloseFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Close} />;
}
