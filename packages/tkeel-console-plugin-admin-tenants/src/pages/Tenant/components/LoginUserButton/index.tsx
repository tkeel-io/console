import { LinkButton } from '@tkeel/console-components';
import { useDeploymentConfigQuery, User } from '@tkeel/console-request-hooks';
import { jumpToPage } from '@tkeel/console-utils';

interface Props {
  data: User;
}

export default function LoginUserButton({ data }: Props) {
  const { tenant_id: tenantId, username } = data;
  const { config } = useDeploymentConfigQuery();
  const path = `${config.portalTenantURL}/auth/login/${tenantId}?username=${username}`;

  const handleClick = () => {
    jumpToPage({ path, isNewWindow: true });
  };

  return <LinkButton onClick={handleClick}>登录</LinkButton>;
}
