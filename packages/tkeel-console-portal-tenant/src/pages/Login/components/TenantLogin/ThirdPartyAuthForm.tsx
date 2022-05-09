import { Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Form } from '@tkeel/console-components';
import { jumpToPage } from '@tkeel/console-utils';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';

import Brand from './Brand';
import { ThirdPartyAuthFormProps } from './types';

export default function ThirdPartyAuthForm({
  isPreview,
  ...rest
}: ThirdPartyAuthFormProps) {
  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const { mutate, isLoading } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      jumpToPage({ path: data.redirect_url, isReplace: true });
    },
  });

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();

        if (isPreview) {
          return;
        }

        mutate({});
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
