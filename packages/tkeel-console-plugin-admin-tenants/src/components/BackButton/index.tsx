import { Button } from '@chakra-ui/react';
import { useGlobalProps } from '@tkeel/console-business-components';
import { ChevronLeftFilledIcon } from '@tkeel/console-icons';

export default function BackButton() {
  const { navigate } = useGlobalProps();

  return (
    <Button
      variant="outline"
      size="sm"
      color="gray.700"
      fontSize="12px"
      leftIcon={<ChevronLeftFilledIcon />}
      onClick={() => {
        navigate(-1);
      }}
    >
      返回
    </Button>
  );
}
