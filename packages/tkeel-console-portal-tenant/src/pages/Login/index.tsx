import { useNavigate, useParams } from 'react-router-dom';

import { jumpToTenantAuthTenantPage } from '@tkeel/console-utils';

import BaseLogin from './components/Login';

export default function Login() {
  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const navigate = useNavigate();

  if (!tenantId) {
    setTimeout(() => {
      jumpToTenantAuthTenantPage({
        isReplace: true,
        navigate,
      });
    });

    return null;
  }

  return <BaseLogin />;
}
