/* eslint-disable eslint-comments/disable-enable-pair, unicorn/filename-case */
import { Base64 } from 'js-base64';

// import { useParams } from 'react-router-dom';
import { AceEditor } from '@tkeel/console-components';

// import { plugin } from '@tkeel/console-utils';
// import useAuthIdProviderRegisterMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useAuthIdProviderRegisterMutation';
import useAuthIdProviderTemplateQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderTemplateQuery';

// import ConfigModal from './ConfigModal';

export default function Config() {
  const { data } = useAuthIdProviderTemplateQuery({
    params: { type: 'OIDC' },
  });
  const config = data?.config ?? '';
  const yaml = Base64.decode(config);

  // const { tenantId = '' } = useParams();
  /* const { isLoading, mutate } = useAuthIdProviderRegisterMutation({
    tenantId,
    onSuccess: () => {
      const toast = plugin.getPortalToast();
      toast.success('设置成功');
      onModalClose();
      refetch();
    },
  }); */

  return (
    <>
      <AceEditor
        theme="light"
        value={yaml}
        language="yaml"
        readOnly
        height="300px"
      />
      {/* {isModalOpen && (
        <ConfigModal
          isOpen={isModalOpen}
          isConfirmButtonLoading={isLoading}
          value={yaml}
          onClose={onModalClose}
          onConfirm={(value) => {
            mutate({ data: { type: 'OIDC', config: Base64.encode(value) } });
          }}
        />
      )} */}
    </>
  );
}
