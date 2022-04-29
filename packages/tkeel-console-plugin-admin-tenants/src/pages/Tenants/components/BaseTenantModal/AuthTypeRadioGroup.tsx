import { Box, HStack, Text, useRadioGroup } from '@chakra-ui/react';

import { RadioCard } from '@tkeel/console-components';
import { AuthType } from '@tkeel/console-types';

import {
  AUTH_TYPES,
  DEFAULT_AUTH_TYPE_VALUE,
} from '@/tkeel-console-plugin-admin-tenants/constants';

export interface Props {
  onChange: (value: AuthType) => void;
}

export default function AuthTypeRadioGroup({ onChange }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'auth_type',
    defaultValue: DEFAULT_AUTH_TYPE_VALUE,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack spacing="12px" {...group}>
      {AUTH_TYPES.map(({ value, label, description }) => {
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
                {label}
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
