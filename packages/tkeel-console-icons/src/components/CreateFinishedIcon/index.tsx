import Equalizer from '@/tkeel-console-icons/assets/icons/two-tone/create-finished.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CreateFinishedIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Equalizer} />;
}

export default CreateFinishedIcon;
