import { Box, Button, createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

export default function Example() {
  return (
    <Box padding="24px">
      <Button
        onClick={() => {
          toast();
        }}
      >
        open toast
      </Button>
    </Box>
  );
}
