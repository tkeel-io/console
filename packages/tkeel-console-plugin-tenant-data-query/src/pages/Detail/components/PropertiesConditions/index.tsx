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

import CustomCheckbox, { CheckboxStatus } from '../CustomCheckbox';
import CustomTab from '../CustomTab';
import RawDataCheckboxes, { CheckBoxItem } from '../RawDataCheckboxes';
import TemplateDataCheckboxes from '../TemplateDataCheckboxes';

type CheckboxStatusDispatch = Dispatch<SetStateAction<CheckboxStatus>>;
type CheckedKeysDispatch = Dispatch<SetStateAction<string[]>>;
type Props = {
  identifiers: string[];
  telemetry: TelemetryFields;
  templateCheckboxStatus: CheckboxStatus;
  setTemplateCheckboxStatus: CheckboxStatusDispatch;
  rawDataCheckboxStatus: CheckboxStatus;
  setRawDataCheckboxStatus: CheckboxStatusDispatch;
  rawDataCheckboxItems: CheckBoxItem[];
  rawDataCheckboxKeys: string[];
  checkedKeys: string[];
  setCheckedKeys: CheckedKeysDispatch;
  rawDataCheckedKeys: string[];
  setRawDataCheckedKeys: CheckedKeysDispatch;
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
  rawDataCheckboxStatus,
  setRawDataCheckboxStatus,
  rawDataCheckboxItems,
  rawDataCheckboxKeys,
  checkedKeys,
  setCheckedKeys,
  rawDataCheckedKeys,
  setRawDataCheckedKeys,
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

  const handleRawDataCheckboxClick = () => {
    if (rawDataCheckboxStatus === CheckboxStatus.CHECKED) {
      setRawDataCheckboxStatus(CheckboxStatus.NOT_CHECKED);
      setRawDataCheckedKeys([]);
    } else {
      setRawDataCheckboxStatus(CheckboxStatus.CHECKED);
      setRawDataCheckedKeys(rawDataCheckboxKeys);
    }
  };

  const handleTemplateDataCheckboxClick = () => {
    if (templateCheckboxStatus === CheckboxStatus.CHECKED) {
      setTemplateCheckboxStatus(CheckboxStatus.NOT_CHECKED);
      setCheckedKeys([]);
    } else {
      setTemplateCheckboxStatus(CheckboxStatus.CHECKED);
      setCheckedKeys(Object.keys(telemetry));
    }
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
            <CustomCheckbox
              checkboxStatus={rawDataCheckboxStatus}
              onClick={handleRawDataCheckboxClick}
            />
            <Text {...tabTextStyle}>原始数据</Text>
          </CustomTab>
          <CustomTab flex="1">
            <CustomCheckbox
              checkboxStatus={templateCheckboxStatus}
              onClick={handleTemplateDataCheckboxClick}
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
                rawDataCheckboxItems={rawDataCheckboxItems}
                rawDataCheckedKeys={rawDataCheckedKeys}
                setRawDataCheckedKeys={setRawDataCheckedKeys}
              />
            </Flex>
          </TabPanel>
          <TabPanel height="100%" padding="0">
            <Flex height="100%" backgroundColor="gray.50">
              <TemplateDataCheckboxes
                telemetry={telemetry}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
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
