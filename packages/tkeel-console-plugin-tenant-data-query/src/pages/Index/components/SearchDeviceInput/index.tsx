import { Box, Button, Input, InputGroup } from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

export default function SearchDeviceInput() {
  return (
    <Box>
      <InputGroup position="relative" width="600px">
        <Input
          height="44px"
          borderRadius="24px"
          _focus={{ borderColor: 'primary' }}
        />
        <Button
          leftIcon={<MagnifierFilledIcon />}
          colorScheme="primary"
          position="absolute"
          right="0"
          top="0"
          height="100%"
          boxShadow="none"
        >
          搜索
        </Button>
      </InputGroup>
    </Box>
  );
}
