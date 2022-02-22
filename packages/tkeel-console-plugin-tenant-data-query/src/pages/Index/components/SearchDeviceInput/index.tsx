import { Box, Input, InputGroup } from '@chakra-ui/react';
import { IconButton } from '@tkeel/console-components';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

export default function SearchDeviceInput() {
  return (
    <Box>
      <InputGroup position="relative" width="600px" height="44px">
        <Input borderRadius="24px" _focus={{ borderColor: 'primary' }} />
        <IconButton
          position="absolute"
          right="0"
          top="0"
          icon={<MagnifierFilledIcon />}
        >
          搜索
        </IconButton>
        {/* <InputRightAddon padding="0" borderRadius="24px">
        </InputRightAddon> */}
      </InputGroup>
    </Box>
  );
}
