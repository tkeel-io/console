import { MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';

interface Props {
  onClick: () => void;
}

export default function Button({ onClick }: Props) {
  return (
    <MoreActionButton
      icon={<EyeFilledIcon size="12px" color="grayAlternatives.300" />}
      title="查看详情"
      onClick={onClick}
    />
  );
}
