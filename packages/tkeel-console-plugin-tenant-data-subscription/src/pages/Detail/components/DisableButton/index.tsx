import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

function DisableButton() {
  return (
    <MoreActionButton
      icon={<TrashFilledIcon />}
      title="停用"
      onClick={() => {
        // eslint-disable-next-line no-console
        // console.log('停用插件');
      }}
    />
  );
}

export default DisableButton;
