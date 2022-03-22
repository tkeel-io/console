import { MoreActionButton } from '@tkeel/console-components';
import { CaretRightFilledIcon, PauseFilledIcon } from '@tkeel/console-icons';

type Props = {
  status: number;
};

function SwitchButton({ status }: Props) {
  return (
    <MoreActionButton
      icon={status === 1 ? <CaretRightFilledIcon /> : <PauseFilledIcon />}
      title={status === 1 ? '启动规则' : '停用规则'}
      onClick={() => {}}
    />
  );
}

export default SwitchButton;
