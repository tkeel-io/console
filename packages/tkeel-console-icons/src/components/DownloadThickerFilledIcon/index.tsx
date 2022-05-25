import DownloadThicker from '@/tkeel-console-icons/assets/icons/filled/download-thicker.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function DownloadThickerFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={DownloadThicker} />;
}

export default DownloadThickerFilledIcon;
