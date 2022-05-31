import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import DisposeAlarmModal from '../DisposeAlarmModal';
// , { DisposeAlarmModalForm }
// import { plugin } from '@tkeel/console-utils';

function DisposeAlarmButton() {
  // const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleConfirm = () => {
    // formValues: DisposeAlarmModalForm
    // console.log(formValues);
    // mutate({
    //   data: formValues,
    // });
  };

  return (
    <>
      <MoreActionButton
        onClick={onOpen}
        icon={<PencilFilledIcon color="grayAlternatives.300" size="12px" />}
        title="处理告警"
      />
      {isOpen && (
        <DisposeAlarmModal
          // isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleConfirm}
        />
      )}
    </>
  );
}

export default DisposeAlarmButton;
