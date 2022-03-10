import SvgComponent from '@/tkeel-console-icons/assets/icons/two-tone/information.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

export default function InfoTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={SvgComponent} />;
}
