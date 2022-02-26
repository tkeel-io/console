import { Button } from '@chakra-ui/react';

import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  onClick: () => unknown;
};

export default function SearchButton({ onClick }: Props) {
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
      onClick={onClick}
    >
      搜索
    </Button>
  );
}
