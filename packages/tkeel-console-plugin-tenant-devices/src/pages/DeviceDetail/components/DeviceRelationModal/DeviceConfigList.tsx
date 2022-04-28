import { Box, Flex, Text } from '@chakra-ui/react';

import { Empty, Loading } from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';
import { AttributeItem, TelemetryItem } from '@tkeel/console-types';

const textStyle = {
  color: 'gray.800',
  fontSize: '14px',
  lineHeight: '32px',
};

interface Props {
  type: 'telemetry' | 'attribute';
  selectedConfig: AttributeItem | TelemetryItem | null;
  handleSelectConfig: (item: AttributeItem | TelemetryItem) => void;
  isLoading?: boolean;
  configKeywords?: string;
  configList: TelemetryItem[] | AttributeItem[];
}

export default function DeviceConfigList({
  selectedConfig,
  handleSelectConfig,
  configList,
  isLoading,
  type,
  configKeywords = '',
}: Props) {
  if (isLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }

  return (
    <Box flex="1" overflowY="auto">
      {configList.length > 0 ? (
        configList
          .filter((v) => v.name.includes(configKeywords))
          .map((item) => {
            const { id, name } = item;
            const hasSelected = selectedConfig?.id === id;
            return (
              <Flex
                key={id}
                height="32px"
                paddingLeft="20px"
                alignItems="center"
                cursor="pointer"
                bg={hasSelected ? 'grayAlternatives.50' : ''}
                onClick={() => {
                  handleSelectConfig(item);
                }}
                _hover={{ backgroundColor: 'grayAlternatives.50' }}
              >
                <DuotoneTwoToneIcon size={20} />
                <Text marginLeft="6px" {...textStyle}>
                  {name}
                </Text>
              </Flex>
            );
          })
      ) : (
        <Empty
          type="component"
          title={
            <Flex flexDirection="column" alignItems="center">
              <Text>该设备暂无{type === 'attribute' ? '属性' : '遥测'}</Text>
              <Text>请重新选择</Text>
            </Flex>
          }
          styles={{
            wrapper: { width: '100%', height: '100%' },
          }}
        />
      )}
    </Box>
  );
}
