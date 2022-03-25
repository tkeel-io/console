import { Box, Circle, Flex, Switch, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Drawer, AceEditor, InfoCard } from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

type Props = {
  usefulData: {
    define: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [propName: string]: any;
    };
    description: string;
    enabled?: boolean;
    enabled_search?: boolean;
    enabled_time_series?: boolean;
    id: string;
    last_time: number;
    name: string;
    type: string;
    weight?: number;
  };
  isOpen: boolean;
  onClose: () => unknown;
};

function TelemetryDrawer({ usefulData, isOpen, onClose }: Props) {
  const [isShowJson, setIsShowJson] = useState<boolean>(false);

  const handleDefineInfo = () => {
    const defineType = {
      default_value: '默认值',
      rw: '读写',
      max: '最大值',
      min: '最小值',
      '0': '0',
      '1': '1',
      length: '长度',
      step: '步长',
      ext: '扩展',
    };
    const defineInfo = [
      {
        label: '数据类型',
        value: usefulData?.type,
      },
    ];
    if (usefulData?.define) {
      // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
      const entry = Object.entries(usefulData?.define as object);
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of entry) {
        if (key !== 'ext') {
          defineInfo.push({
            // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
            label: defineType[key],
            // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
            value,
          });
        }
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
      }
    }
    return defineInfo;
  };

  return (
    <Drawer
      title={`遥测「${usefulData?.name}」详情`}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsShowJson(false);
      }}
    >
      <Box>
        <Flex
          padding="20px 0 20px 24px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="grayAlternatives.50"
        >
          <Circle size="76px" backgroundColor="gray.50">
            <DuotoneTwoToneIcon size={32} />
          </Circle>
          <Box marginLeft="20px">
            <Text
              color="gray.800"
              fontSize="16px"
              fontWeight="500"
              lineHeight="22px"
            >
              {usefulData?.name}
            </Text>
            <Text
              margin="4px 0"
              height="24px"
              color="grayAlternatives.300"
              fontSize="12px"
              lineHeight="24px"
              isTruncated
            >
              {usefulData?.description}
            </Text>
          </Box>
        </Flex>
        <Box padding="24px 24px">
          <Flex justifyContent="space-between" alignItems="center" mb="20px">
            <Box>基本信息</Box>
            <Flex alignItems="center">
              <Switch
                size="sm"
                // isChecked={isRangeSearch}
                colorScheme="primary"
                __css={{ 'span:focus': { boxShadow: 'none !important' } }}
                onChange={(e) => {
                  setIsShowJson(e.target.checked);
                  // console.log('e', e.target.checked);
                }}
              />
              <Box color="gray.500" fontSize="12px" fontWeight="400" ml="4px">
                json格式
              </Box>
            </Flex>
          </Flex>

          {isShowJson ? (
            <AceEditor
              theme="light"
              value={JSON.stringify(usefulData, null, 2)}
              language="json"
              readOnly
              width="100%"
              height="144px"
            />
          ) : (
            <>
              <InfoCard
                title=" "
                styles={{
                  wrapper: {
                    backgroundColor: 'gray.50',
                  },
                }}
                data={[
                  {
                    label: '遥测ID',
                    value: usefulData?.id,
                  },
                  {
                    label: '时间戳',
                    value: formatDateTimeByTimestamp({
                      timestamp: `${usefulData?.last_time}`,
                    }),
                  },
                ]}
              />
              <InfoCard
                title=" "
                styles={{
                  wrapper: {
                    marginTop: '20px',
                    backgroundColor: 'gray.50',
                  },
                }}
                data={handleDefineInfo()}
              />
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

export default TelemetryDrawer;
