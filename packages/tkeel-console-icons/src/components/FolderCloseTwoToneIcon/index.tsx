import FolderClose from '@/tkeel-console-icons/assets/icons/two-tone/folder-close.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function TagsTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={FolderClose} />;
}

export default TagsTwoToneIcon;
