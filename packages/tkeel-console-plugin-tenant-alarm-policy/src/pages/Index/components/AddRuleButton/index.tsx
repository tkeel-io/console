import { Flex, Text } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';
import { AddFilledIcon } from '@tkeel/console-icons';

interface Props {
  onClick: () => void;
}

export default function AddRuleButton({ onClick }: Props) {
  const primaryColor = useColor('primary');

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      _hover={{
        svg: {
          fill: `${primaryColor} !important`,
        },
        p: {
          color: primaryColor,
        },
      }}
      onClick={onClick}
    >
      <AddFilledIcon color="grayAlternatives.300" />
      <Text color="grayAlternatives.300" fontSize="12px" fontWeight="500">
        添加规则
      </Text>
    </Flex>
  );
}
