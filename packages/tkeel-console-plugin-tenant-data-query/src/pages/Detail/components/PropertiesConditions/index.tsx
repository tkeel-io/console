import {
  Button,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { SearchInput } from '@tkeel/console-components';

import { TelemetryFields } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

import CustomCheckbox, { CheckBoxStatus } from '../CustomCheckbox';
import CustomTab from '../CustomTab';
import RawDataCheckboxes from '../RawDataCheckboxes';
import TemplateDataCheckboxes from '../TemplateDataCheckboxes';

type Props = {
  identifiers: string[];
  telemetry: TelemetryFields;
  templateCheckboxStatus: CheckBoxStatus;
  setTemplateCheckboxStatus: Dispatch<SetStateAction<CheckBoxStatus>>;
  checkedKeys: string[];
  setCheckedKeys: Dispatch<SetStateAction<string[]>>;
  checkedRawDataKeys: string[];
  setCheckedRawDataKeys: Dispatch<SetStateAction<string[]>>;
  isDeviceDetailLoading: boolean;
  isTelemetryDataLoading: boolean;
  onSearch: (value: string) => unknown;
  onConfirm: () => unknown;
};

export default function PropertiesConditions({
  identifiers,
  telemetry,
  templateCheckboxStatus,
  setTemplateCheckboxStatus,
  checkedKeys,
  setCheckedKeys,
  checkedRawDataKeys,
  setCheckedRawDataKeys,
  isDeviceDetailLoading,
  isTelemetryDataLoading,
  onSearch,
  onConfirm,
}: Props) {
  const tabTextStyle = {
    marginLeft: '8px',
    color: 'gray.700',
    fontSize: '12px',
    fontWeight: '400',
  };

  return (
    <Flex
      flexDirection="column"
      flex="1"
      overflow="hidden"
      marginTop="12px"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Flex
        padding="8px 20px 0"
        justifyContent="space-between"
        alignItems="center"
        fontSize="12px"
        lineHeight="24px"
      >
        <Text color="gray.800" fontWeight="500">
          属性条件
        </Text>
        {/* <Flex alignItems="center" cursor="pointer">
              <BroomFilledIcon color="grayAlternatives.300" />
              <Text marginLeft="6px" color="grayAlternatives.300">
                清空
              </Text>
            </Flex> */}
      </Flex>
      <SearchInput
        width="320px"
        inputGroupStyle={{ margin: '8px 20px 12px', flexShrink: 0 }}
        placeholder="搜索"
        onSearch={onSearch}
      />
      <Tabs display="flex" overflowY="auto" flexDirection="column" flex="1">
        <TabList display="flex" borderBottom="none">
          <CustomTab flex="1">
            <CustomCheckbox />
            <Text {...tabTextStyle}>原始数据</Text>
          </CustomTab>
          <CustomTab flex="1">
            <CustomCheckbox
              checkboxStatus={templateCheckboxStatus}
              onClick={() => {
                if (templateCheckboxStatus === CheckBoxStatus.CHECKED) {
                  setTemplateCheckboxStatus(CheckBoxStatus.NOT_CHECKED);
                  setCheckedKeys([]);
                } else {
                  setTemplateCheckboxStatus(CheckBoxStatus.CHECKED);
                  setCheckedKeys(Object.keys(telemetry));
                }
              }}
            />
            <Text {...tabTextStyle}>模板数据</Text>
          </CustomTab>
        </TabList>
        <TabPanels flex="1">
          <TabPanel height="100%" padding="0">
            <Flex
              flexDirection="column"
              height="100%"
              padding="8px 20px"
              backgroundColor="gray.50"
            >
              <RawDataCheckboxes
                checkedRawDataKeys={checkedRawDataKeys}
                setCheckedRawDataKeys={setCheckedRawDataKeys}
              />
            </Flex>
          </TabPanel>
          <TabPanel height="100%" padding="0">
            <Flex height="100%" backgroundColor="gray.50">
              <TemplateDataCheckboxes
                telemetry={telemetry}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                setTemplateCheckboxStatus={setTemplateCheckboxStatus}
                isDeviceDetailLoading={isDeviceDetailLoading}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        colorScheme="brand"
        margin="12px 20px"
        flexShrink={0}
        disabled={identifiers.length === 0}
        isLoading={isTelemetryDataLoading}
        onClick={onConfirm}
      >
        确定
      </Button>
    </Flex>
  );
}
