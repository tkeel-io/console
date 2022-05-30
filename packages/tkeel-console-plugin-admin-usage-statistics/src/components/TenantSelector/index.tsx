import { Flex, Text } from '@chakra-ui/react';

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
  const options = [
    ALL_TENANTS_OPTION,
    ...tenants.map(({ tenant_id, title }) => ({
      value: tenant_id,
      label: title,
    })),
  ];

  return (
    <Flex alignItems="center">
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="20px"
        color="gray.500"
        opacity="0.8"
      >
        租户空间：
      </Text>
      <Select options={options} value={value} onChange={onChange} />
    </Flex>
  );
}
