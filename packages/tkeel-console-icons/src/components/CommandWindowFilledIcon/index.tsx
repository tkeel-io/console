import CommandWindow from '@/tkeel-console-icons/assets/icons/filled/command-window.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CommandWindowFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={CommandWindow} />;
}

export default CommandWindowFilledIcon;
