import { Flex, StyleProps, Text } from '@chakra-ui/react';

interface Props {
  title: string | number;
  subTitle: string;
  styles?: {
    wrapper?: StyleProps;
    title?: StyleProps;
    subTitle?: StyleProps;
  };
}

function Brief({ title, subTitle, styles }: Props) {
  return (
    <Flex
      flexDirection="column"
      textAlign="left"
      ml="16px"
      {...styles?.wrapper}
    >
      <Text color="gray.800" fontSize="14px" {...styles?.title}>
        {title}
      </Text>
      <Text color="grayAlternatives.300" fontSize="12px" {...styles?.subTitle}>
        {subTitle}
      </Text>
    </Flex>
  );
}

export default Brief;
