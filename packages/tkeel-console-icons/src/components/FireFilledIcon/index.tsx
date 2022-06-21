import Fire from '@/tkeel-console-icons/assets/icons/filled/fire.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function FireFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Fire} />;
}

export default FireFilledIcon;
