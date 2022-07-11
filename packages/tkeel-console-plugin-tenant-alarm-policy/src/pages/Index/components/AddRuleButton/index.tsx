import { Flex, Text } from '@chakra-ui/react';

import { Tooltip } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { AddFilledIcon } from '@tkeel/console-icons';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function AddRuleButton({ disabled, onClick }: Props) {
  const primaryColor = useColor('primary');

  const hoverStyle = disabled
    ? {}
    : {
        svg: {
          fill: `${primaryColor} !important`,
        },
        p: {
          color: primaryColor,
        },
      };

  return (
    <Tooltip label={disabled ? '告警规则最多限制 5 条' : ''}>
      <Flex
        alignItems="center"
        opacity={disabled ? '.5' : '1'}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        _hover={hoverStyle}
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
      >
        <AddFilledIcon color="grayAlternatives.300" />
        <Text color="grayAlternatives.300" fontSize="12px" fontWeight="500">
          添加规则
        </Text>
      </Flex>
    </Tooltip>
  );
}
