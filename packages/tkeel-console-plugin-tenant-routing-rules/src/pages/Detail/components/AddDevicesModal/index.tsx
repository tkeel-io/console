import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, SearchInput } from '@tkeel/console-components';
import { BroomFilledIcon } from '@tkeel/console-icons';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function AddDevicesModal({ isOpen, onClose, onConfirm }: Props) {
  const [deviceGroupKeywords, setDeviceGroupKeywords] = useState('');
  const [deviceKeywords, setDeviceKeywords] = useState('');

  const handleDeviceGroupSearch = () => {
    // eslint-disable-next-line no-console
    console.log('deviceGroupKeywords', deviceGroupKeywords);
  };

  const handleDeviceSearch = () => {
    // eslint-disable-next-line no-console
    console.log('deviceKeywords', deviceKeywords);
  };

  const titleStyle = {
    color: 'gray.800',
    fontSize: '14px',
    lineHeight: '24px',
    fontWeight: '600',
  };

  const inputGroupStyle = {
    marginTop: '8px',
    marginBottom: '12px',
    width: '100%',
  };

  const contentStyle = {
    flex: '1',
    borderRadius: '4px',
    backgroundColor: 'gray.50',
  };

  return (
    <Modal
      title="添加设备"
      width="900px"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      modalBodyStyle={{ padding: '20px' }}
    >
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" width="540px">
          <Text {...titleStyle}>设备组</Text>
          <SearchInput
            placeholder="支持搜索设备分组名称"
            value={deviceGroupKeywords}
            onChange={(value) => {
              setDeviceGroupKeywords(value);
            }}
            onSearch={handleDeviceGroupSearch}
            inputGroupStyle={inputGroupStyle}
          />
          <Flex justifyContent="space-between">
            <Box {...contentStyle}>treeGroup</Box>
            <Box marginLeft="20px" {...contentStyle}>
              deviceList
            </Box>
          </Flex>
        </Flex>
        <Flex flexDirection="column" width="300px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text {...titleStyle}>已选择（4）</Text>
            <Flex alignItems="center" cursor="pointer">
              <BroomFilledIcon size="14px" color="grayAlternatives.300 " />
              <Text
                marginLeft="5px"
                color="gray.700"
                fontSize="12px"
                lineHeight="18px"
              >
                清空
              </Text>
            </Flex>
          </Flex>
          <SearchInput
            placeholder="支持搜索设备名称"
            value={deviceKeywords}
            onChange={(value) => {
              setDeviceKeywords(value);
            }}
            onSearch={handleDeviceSearch}
            inputGroupStyle={inputGroupStyle}
          />
          <Box {...contentStyle}>selected</Box>
        </Flex>
      </Flex>
    </Modal>
  );
}
