import { Box, HStack, Text, useRadioGroup } from '@chakra-ui/react';

import { RadioCard } from '@tkeel/console-components';

import {
  AUTH_TYPES,
  DEFAULT_AUTH_TYPE,
} from '@/tkeel-console-plugin-admin-tenants/constants';
import { AuthTypes } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

export interface Props {
  onChange: (value: AuthTypes) => void;
}

export default function AuthTypeRadioGroup({ onChange }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'auth_type',
    defaultValue: DEFAULT_AUTH_TYPE,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack spacing="12px" {...group}>
      {AUTH_TYPES.map(({ key, name, description }) => {
        const radio = getRadioProps({ value: key });

        return (
          <RadioCard
            key={key}
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
