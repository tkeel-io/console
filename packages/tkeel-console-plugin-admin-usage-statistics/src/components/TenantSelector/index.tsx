import { Select } from '@tkeel/console-components';
import { MAX_INT32 } from '@tkeel/console-constants';
import { useTenantsQuery } from '@tkeel/console-request-hooks';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ALL_TENANTS_OPTION = {
  value: '',
  label: '全部空间',
};

export default function TenantSelector({ value, onChange }: Props) {
  const { tenants } = useTenantsQuery({ params: { page_size: MAX_INT32 } });
  const options = tenants.map(({ tenant_id, title }) => ({
    value: tenant_id,
    label: title,
  }));

  return (
    <Select
      defaultOption={ALL_TENANTS_OPTION}
      options={options}
      value={value}
      showSearchInput
      labelPrefix="租户空间："
      styles={{ wrapper: { width: '200px' } }}
      onChange={onChange}
    />
  );
}
