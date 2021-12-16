import React from 'react';
import {
  // Flex,
  // Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { Form } from '@tkeel/console-components';

function Login(): JSX.Element {
  return (
    <Center flexDirection="column" height="100vh">
      <Heading as="h1" lineHeight="48px" fontSize="48px" fontWeight={700}>
        tKeel 平台
      </Heading>
      <Form paddingBottom="100px" onSubmit={() => {}}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="password" />
          <FormErrorMessage>123</FormErrorMessage>
        </FormControl>
      </Form>
    </Center>
  );
}

export default Login;
