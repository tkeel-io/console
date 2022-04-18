import { Box, HStack, Text, useRadioGroup } from '@chakra-ui/react';

import { RadioCard } from '@tkeel/console-components';

import { AuthTypes } from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useCreateTenantMutation';

export interface Props {
  onChange: (value: AuthTypes) => void;
}

const OPTIONS = [
  {
    name: '平台默认',
    description:
      '用户的管理在平台侧，管理员可在 tkeel 租户平台注册、管理用户。',
    value: 'internal',
  },
  {
    name: '第三方',
    description:
      '用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。',
    value: 'external',
  },
];

export default function AuthTypeRadioGroup({ onChange }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'auth_type',
    defaultValue: 'internal',
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack spacing="12px" {...group}>
      {OPTIONS.map(({ value, name, description }) => {
        const radio = getRadioProps({ value });

        return (
          <RadioCard
            key={value}
            style={{
              borderWidth: '2px',
              borderRadius: '4px',
              width: '254px',
              padding: '12px 20px',
            }}
            {...radio}
          >
            <Box>
              <Text color="black" fontSize="14px" lineHeight="24px">
                {name}
              </Text>
              <Text
                paddingTop="4px"
                color="gray.500"
                fontSize="12px"
                lineHeight="130%"
              >
                {description}
              </Text>
            </Box>
          </RadioCard>
        );
      })}
    </HStack>
  );
}
