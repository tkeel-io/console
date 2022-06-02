import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  info: {
    label: ReactNode;
    value: ReactNode;
  }[];
  styles?: {
    wrapper?: StyleProps;
    item?: StyleProps;
    label?: StyleProps;
    value?: StyleProps;
  };
}

function isText(value: ReactNode) {
  return ['string', 'number'].includes(typeof value);
}

export default function AlarmInfoCard({ info, styles }: Props) {
  return (
    <Flex
      marginTop="12px"
      padding="12px 20px 4px"
      flexWrap="wrap"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="gray.50"
      {...styles?.wrapper}
    >
      {info.map(({ label, value }, i) => (
        <Flex
          key={isText(label) ? String(label) : i}
          width="50%"
          alignItems="center"
          fontSize="12px"
          lineHeight="24px"
          marginBottom="8px"
          {...styles?.item}
        >
          {isText(label) ? (
            <Text
              width="90px"
              color="gray.500"
              fontWeight="500"
              {...styles?.label}
            >
              {label}
            </Text>
          ) : (
            label
          )}
          {isText(value) ? (
            <Text color="grayAlternatives.700" {...styles?.value}>
              {value}
            </Text>
          ) : (
            value
          )}
        </Flex>
      ))}
    </Flex>
  );
}
