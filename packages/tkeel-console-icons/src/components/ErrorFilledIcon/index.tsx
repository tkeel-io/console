import svgComponent from '@/tkeel-console-icons/assets/icons/filled/error.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

export default function ErrorFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={svgComponent} />;
}
