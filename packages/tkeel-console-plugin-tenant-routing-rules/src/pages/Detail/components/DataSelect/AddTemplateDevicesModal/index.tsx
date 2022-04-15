import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  CheckDeviceList,
  DeviceItemExtended,
} from '@tkeel/console-business-components';
import {
  Empty,
  Modal,
  SearchEmpty,
  SearchInput,
} from '@tkeel/console-components';
import { useDeviceListQuery } from '@tkeel/console-request-hooks';

import useRuleDetailQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDetailQuery';
import useRuleDevicesIdArrayQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDevicesIdArrayQuery';

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

  const { data: ruleDetail } = useRuleDetailQuery(id || '');
  const { deviceIds } = useRuleDevicesIdArrayQuery(id || '');
  const templateId = ruleDetail?.model_id ?? '';
  const templateName = ruleDetail?.model_name ?? '';
  useDeviceListQuery({
    requestData: {
      condition: [
        {
          field: 'basicInfo.templateId',
          operator: '$wildcard',
          value: templateId,
        },
      ],
    },
    onSuccess(data) {
      const items = data?.data?.listDeviceObject?.items ?? [];
      const devices = items.map((device) => ({
        ...device,
        hasSelected: deviceIds.includes(device.id),
      }));
      setDeviceList(devices);
    },
    enabled: !!templateId,
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
          设备模版：{templateName}
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
          <CheckDeviceList
            isLoading={false}
            deviceList={deviceList}
            keywords={keywords}
            empty={
              keywords ? (
                <SearchEmpty
                  styles={{
                    wrapper: { width: '100%' },
                    text: { color: 'gray.600' },
                  }}
                />
              ) : (
                <Empty
                  title="该模板暂无设备"
                  styles={{
                    wrapper: { marginTop: '0', width: '100%', height: '100%' },
                    title: { fontSize: '12px' },
                  }}
                />
              )
            }
            selectedDevices={selectedDevices}
            handleSetSelectedDevices={(devices) => setSelectedDevices(devices)}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
