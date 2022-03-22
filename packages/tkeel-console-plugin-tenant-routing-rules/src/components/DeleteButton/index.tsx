import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

// type Props = {
//   id: string;
// };

function DeleteButton() {
  return (
    <MoreActionButton
      icon={<TrashFilledIcon />}
      title="删除规则"
      onClick={() => {}}
    />
  );
}

export default DeleteButton;
