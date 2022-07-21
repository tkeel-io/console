import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';
import { AddFilledIcon } from '@tkeel/console-icons';

import Tooltip from '../Tooltip';

interface Props {
  showIcon?: boolean;
  icon?: ReactNode;
  showTooltip?: boolean;
  tooltipLabel?: string;
  disabled?: boolean;
  children: string;
  onClick: () => void;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function TextButton({
  showIcon = false,
  icon = <AddFilledIcon color="grayAlternatives.300" />,
  showTooltip = false,
  tooltipLabel = '',
  disabled = false,
  children,
  onClick,
  sx,
  styles,
}: Props) {
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

  const label = showTooltip && disabled ? tooltipLabel : '';
  return (
    <Flex
      alignItems="center"
      opacity={disabled ? '.5' : '1'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={hoverStyle}
      {...styles?.root}
      {...sx}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      <Tooltip label={label}>
        <Flex alignItems="center">
          {showIcon && icon}
          <Text color="grayAlternatives.300" fontSize="12px" fontWeight="500">
            {children}
          </Text>
        </Flex>
      </Tooltip>
    </Flex>
  );
}
