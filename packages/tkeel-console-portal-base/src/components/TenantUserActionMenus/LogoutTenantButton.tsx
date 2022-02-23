import { MoreActionButton } from '@tkeel/console-components';
import { ShutdownFilledIcon } from '@tkeel/console-icons';

export default function LogoutTenantButton() {
  return (
    <MoreActionButton
      title="退出登录"
      icon={<ShutdownFilledIcon />}
      onClick={() => {}}
    />
  );
}
