import Webcam from '@/tkeel-console-icons/assets/icons/two-tone/webcam.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function WebcamTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Webcam} />;
}

export default WebcamTwoToneIcon;
