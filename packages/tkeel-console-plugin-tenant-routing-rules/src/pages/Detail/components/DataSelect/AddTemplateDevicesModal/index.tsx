import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, SearchInput } from '@tkeel/console-components';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function AddTemplateDevicesModal({ isOpen, onClose }: Props) {
  const [keywords, setKeywords] = useState('');
  // eslint-disable-next-line no-console
  console.log('AddTemplateDevicesModal ~ keywords', keywords);
  return (
    <Modal
      title="添加设备"
      width="600px"
      isOpen={isOpen}
      onClose={onClose}
      // onConfirm={handleConfirm}
      // isConfirmButtonLoading={isLoading}
      // isConfirmButtonDisabled={selectedDevices.length === 0}
      modalBodyStyle={{ padding: '20px' }}
    >
      <Flex>
        <Text
          color="gray.800"
          fontSize="14px"
          fontWeight="600"
          lineHeight="24px"
        >
          设备模版：SIC电表
        </Text>
        <SearchInput
          onSearch={(value: string) => setKeywords(value)}
          inputGroupStyle={{ marginTop: '12px' }}
        />
      </Flex>
      AddTemplateDevicesModal
    </Modal>
  );
}
