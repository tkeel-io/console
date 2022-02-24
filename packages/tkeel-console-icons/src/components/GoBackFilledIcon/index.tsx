import GoBack from '@/tkeel-console-icons/assets/icons/filled/go-back.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function GoBackFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={GoBack} />;
}

export default GoBackFilledIcon;
