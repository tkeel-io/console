import AlarmLamp from '@/tkeel-console-icons/assets/icons/filled/alarm-lamp.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function AlarmLampFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={AlarmLamp} />;
}

export default AlarmLampFilledIcon;
