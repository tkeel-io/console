import { Circle } from '@chakra-ui/react';

import { RefreshFilledIcon } from '@tkeel/console-icons';

type Props = {
  disabled: boolean;
  onClick: () => unknown;
};

export default function RefreshButton({ disabled, onClick }: Props) {
  return (
    <Circle
      size="32px"
      backgroundColor="gray.100"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    >
      <RefreshFilledIcon color="grayAlternatives.300" />
    </Circle>
  );
}
