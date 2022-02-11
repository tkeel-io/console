import FileBox from '@/tkeel-console-icons/assets/icons/two-tone/file-box.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function FileBoxTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={FileBox} />;
}

export default FileBoxTwoToneIcon;
