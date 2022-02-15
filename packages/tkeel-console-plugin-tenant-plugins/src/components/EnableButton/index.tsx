import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

function EnableButton() {
  return (
    <MoreActionButton
      icon={<TrashFilledIcon />}
      title="启用"
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('启用插件');
      }}
    />
  );
}

export default EnableButton;
