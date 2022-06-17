import { useOutletContext } from 'react-router-dom';

interface Context {
  tenantId: string;
}

export default function useTenantId() {
  const { tenantId } = useOutletContext<Context>();

  return tenantId;
}
