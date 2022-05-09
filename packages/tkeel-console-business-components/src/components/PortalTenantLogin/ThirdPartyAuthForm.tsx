import { Button } from '@chakra-ui/react';

import { Form } from '@tkeel/console-components';

import Brand from './Brand';
import type { ThirdPartyAuthFormProps } from './types';

export default function ThirdPartyAuthForm({
  isLoading,
  onSubmit,
  ...rest
}: ThirdPartyAuthFormProps) {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Brand
        {...rest}
        align="center"
        styles={{ root: { paddingBottom: '32px' } }}
      />
      <Button
        type="submit"
        colorScheme="brand"
        isFullWidth
        height="45px"
        borderRadius="4px"
        shadow="none"
        isLoading={isLoading}
      >
        单点登录
      </Button>
    </Form>
  );
}
