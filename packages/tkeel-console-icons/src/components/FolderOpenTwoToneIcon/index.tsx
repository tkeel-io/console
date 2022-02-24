import FolderOpen from '@/tkeel-console-icons/assets/icons/two-tone/folder-open.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function TagsTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={FolderOpen} />;
}

export default TagsTwoToneIcon;
