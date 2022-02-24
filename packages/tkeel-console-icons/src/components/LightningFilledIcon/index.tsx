import Lightning from '@/tkeel-console-icons/assets/icons/filled/lightning.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function LightningFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Lightning} />;
}

export default LightningFilledIcon;
