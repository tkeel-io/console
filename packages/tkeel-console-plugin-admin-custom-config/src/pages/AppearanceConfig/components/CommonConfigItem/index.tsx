import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  title: string;
  desc: string;
  formField: ReactNode;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function ConfigItem({ title, desc, formField, styles }: Props) {
  return (
    <Flex flexDirection="column" width="100%" {...styles?.wrapper}>
      <Text color="gray.800" fontSize="14px" lineHeight="20px" fontWeight="600">
        {title}
      </Text>
      <Text marginTop="4px" marginBottom="9px" color="gray.500" fontSize="12px">
        {desc}
      </Text>
      {formField}
    </Flex>
  );
}
