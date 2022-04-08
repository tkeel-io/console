import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, SearchInput } from '@tkeel/console-components';
import { DeviceItem } from '@tkeel/console-request-hooks';

import DeviceList from '../DeviceList';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function AddTemplateDevicesModal({ isOpen, onClose }: Props) {
  const [keywords, setKeywords] = useState('');
  // eslint-disable-next-line no-console
  console.log('AddTemplateDevicesModal ~ keywords', keywords);

  const handleAllCheckBoxChange = (checked: boolean) => {
    // eslint-disable-next-line no-console
    console.log('handleAllCheckBoxChange ~ checked', checked);
  };

  const handleItemCheckBoxChange = ({
    checked,
    device,
  }: {
    checked: boolean;
    device: DeviceItem;
  }) => {
    // eslint-disable-next-line no-console
    console.log('AddTemplateDevicesModal ~ device', device);
    // eslint-disable-next-line no-console
    console.log('AddTemplateDevicesModal ~ checked', checked);
  };

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
      <Flex flexDirection="column">
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
          placeholder="搜索"
          inputGroupStyle={{ margin: '12px 0', width: '100%' }}
        />
        <Flex height="416px" borderRadius="4px" backgroundColor="gray.50">
          <DeviceList
            isLoading={false}
            deviceList={[]}
            selectedDevices={[]}
            handleAllCheckBoxChange={handleAllCheckBoxChange}
            handleItemCheckBoxChange={handleItemCheckBoxChange}
          />
        </Flex>
      </Flex>
      AddTemplateDevicesModal
    </Modal>
  );
}
