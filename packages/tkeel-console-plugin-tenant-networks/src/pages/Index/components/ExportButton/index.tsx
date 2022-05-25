import { Circle, useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { DownloadThickerFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useExportMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useExportMutation';

const exportFile = (data: string, name: string, opts: { type: string }) => {
  const urlObject = window.URL || window.webkitURL || window;
  const exportBlob: Blob = new Blob([data], opts);
  const createA: HTMLAnchorElement = document.createElement('a');
  createA.href = urlObject.createObjectURL(exportBlob);
  createA.download = name;
  createA.click();
};

function ExportButton() {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useExportMutation({
    onSuccess(data) {
      exportFile(data?.data?.content, 'template', { type: 'text/csv' });
      toast('下载成功', { status: 'success' });
      onClose();
    },
  });
  const handleConfirm = () => {
    mutate({});
  };
  return (
    <>
      <MoreActionButton
        icon={<DownloadThickerFilledIcon color="grayAlternatives.300" />}
        title="下载模板"
        onClick={onOpen}
        // onClick={handleConfirm}
      />
      {isOpen && (
        <Alert
          iconPosition="left"
          icon={
            <Circle size="44px" bgColor="brand.50">
              <DownloadThickerFilledIcon size="24px" color="green.300" />
            </Circle>
          }
          title="确认下载模板？"
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default ExportButton;
