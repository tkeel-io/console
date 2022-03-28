import SvgComponent from '@/tkeel-console-icons/assets/icons/filled/question.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function QuestionFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={SvgComponent} />;
}

export default QuestionFilledIcon;
