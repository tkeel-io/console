import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal, SearchInput } from '@tkeel/console-components';
import { useDeviceListQuery } from '@tkeel/console-request-hooks';

import useRuleDevicesIdArrayQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDevicesIdArrayQuery';

import DeviceList, { DeviceItemExtended } from '../DeviceList';

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => unknown;
  onConfirm: (devices: DeviceItemExtended[]) => unknown;
};

export default function AddTemplateDevicesModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: Props) {
  const { id } = useParams();
  const [deviceList, setDeviceList] = useState<DeviceItemExtended[]>([]);
  const [keywords, setKeywords] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<DeviceItemExtended[]>(
    []
  );

  const { deviceIds } = useRuleDevicesIdArrayQuery(id || '');
  useDeviceListQuery({
    requestData: {
      condition: [
        {
          field: 'basicInfo.templateId',
          operator: '$wildcard',
          value: 'iotd-29c1fca9-79eb-437b-ba9d-0dc225eb4ce0',
        },
      ],
    },
    onSuccess(data) {
      const items = data?.data?.listDeviceObject?.items ?? [];
      const devices = items.map((device) => ({
        ...device,
        hasSelected: deviceIds.includes(device.id),
      }));
      const hasSelectedDevices = devices.filter((device) => device.hasSelected);
      setDeviceList(devices);
      setSelectedDevices(hasSelectedDevices);
    },
  });

  return (
    <Modal
      title="添加设备"
      width="600px"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() =>
        onConfirm(selectedDevices.filter((device) => !device.hasSelected))
      }
      isConfirmButtonLoading={isLoading}
      isConfirmButtonDisabled={selectedDevices.length === 0}
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
            keywords={keywords}
            selectedDevices={selectedDevices}
            handleSetSelectedDevices={(devices) => setSelectedDevices(devices)}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
