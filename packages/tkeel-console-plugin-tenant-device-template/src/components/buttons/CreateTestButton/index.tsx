import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';
import Modal from '@tkeel/console-components/src/components/Modal';

import CustomTemplateButton from '@/tkeel-console-plugin-tenant-device-template/components/buttons/CustomTemplateButton';

type Props = {
  onSuccess: () => void;
};

export default function CreateTestButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>添加模板</CreateButton>
      <Modal
        title={<Text fontSize="14px">创建模板</Text>}
        isOpen={isOpen}
        onClose={onClose}
        modalBodyStyle={{ padding: '20px 20px' }}
        hasCancelButton={false}
        hasConfirmButton={false}
        width="900px"
        footer={null}
      >
        <Flex justifyContent="space-between" w="100%">
          <CustomTemplateButton onSuccess={onSuccess} />
          <CustomTemplateButton onSuccess={onSuccess} />
        </Flex>
      </Modal>
    </>
  );
}
