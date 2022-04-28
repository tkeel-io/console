import { Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Form } from '@tkeel/console-components';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';

import Brand from '../Brand';

export default function ThirdPartyAuthForm() {
  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const { mutate, isLoading } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      window.location.href = data.redirect_url;
    },
  });

  return (
    <Form
      marginBottom="0"
      onSubmit={(event) => {
        mutate({});
        event.preventDefault();
      }}
    >
      <Brand align="center" />
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
