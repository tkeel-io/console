import { Button } from '@chakra-ui/react';

import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  disabled: boolean;
  onClick: () => unknown;
};

export default function SearchButton({ disabled, onClick }: Props) {
  return (
    <Button
      leftIcon={<MagnifierFilledIcon color="white" size={20} />}
      colorScheme="primary"
      position="absolute"
      right="0"
      top="0"
      height="100%"
      fontSize="14px"
      boxShadow="none"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      搜索
    </Button>
  );
}
