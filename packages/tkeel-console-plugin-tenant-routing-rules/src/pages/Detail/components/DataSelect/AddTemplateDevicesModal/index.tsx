import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, SearchInput } from '@tkeel/console-components';
import { DeviceItem, useDeviceListQuery } from '@tkeel/console-request-hooks';

import DeviceList from '../DeviceList';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function AddTemplateDevicesModal({ isOpen, onClose }: Props) {
  const [keywords, setKeywords] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<DeviceItem[]>([]);
  // eslint-disable-next-line no-console
  console.log('AddTemplateDevicesModal ~ keywords', keywords);

  const { deviceList } = useDeviceListQuery({
    requestData: {
      condition: [
        {
          field: 'basicInfo.templateId',
          operator: '$wildcard',
          value: 'iotd-29c1fca9-79eb-437b-ba9d-0dc225eb4ce0',
        },
        // {
        //   field: 'basicInfo.name',
        //   operator: '$wildcard',
        //   value: keywords,
        // },
      ],
    },
  });
  // eslint-disable-next-line no-console
  console.log('AddTemplateDevicesModal ~ deviceList', deviceList);

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
        <Flex
          height="408px"
          padding="16px 0"
          borderRadius="4px"
          backgroundColor="gray.50"
        >
          <DeviceList
            isLoading={false}
            deviceList={deviceList}
            selectedDevices={selectedDevices}
            handleSetSelectedDevices={(devices) => setSelectedDevices(devices)}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
