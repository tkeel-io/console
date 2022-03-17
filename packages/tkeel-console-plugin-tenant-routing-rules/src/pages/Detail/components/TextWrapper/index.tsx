import { Flex, StyleProps, Text } from '@chakra-ui/react';

type Props = {
  label: string;
  value: string;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function TextWrapper({ label, value, styles }: Props) {
  return (
    <Flex
      alignItems="center"
      fontSize="12px"
      lineHeight="24px"
      {...styles?.wrapper}
    >
      <Text color="grayAlternatives.300">{label}：</Text>
      <Text marginLeft="4px" color="gray.800">
        {value}
      </Text>
    </Flex>
  );
}
