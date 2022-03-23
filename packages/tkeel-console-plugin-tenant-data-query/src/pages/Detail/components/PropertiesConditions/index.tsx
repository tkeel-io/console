import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { Loading, SearchInput, Tree } from '@tkeel/console-components';

import propertiesEmpty from '@/tkeel-console-plugin-tenant-data-query/assets/images/properties-empty.svg';
import { TelemetryFields } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

import CustomCheckbox from '../CustomCheckbox';
import CustomTab from '../CustomTab';

export enum CheckBoxStatus {
  NOT_CHECKED = 'not-checked',
  CHECKED = 'checked',
  INDETERMINATE = 'indeterminate',
}

type Props = {
  telemetry: TelemetryFields;
  keywords: string;
  templateCheckboxStatus: CheckBoxStatus;
  setTemplateCheckboxStatus: Dispatch<SetStateAction<CheckBoxStatus>>;
  checkedKeys: string[];
  setCheckedKeys: Dispatch<SetStateAction<string[]>>;
  isDeviceDetailLoading: boolean;
  isTelemetryDataLoading: boolean;
  onSearch: (value: string) => unknown;
  onConfirm: () => unknown;
};

export default function PropertiesConditions({
  telemetry,
  keywords,
  templateCheckboxStatus,
  setTemplateCheckboxStatus,
  checkedKeys,
  setCheckedKeys,
  isDeviceDetailLoading,
  isTelemetryDataLoading,
  onSearch,
  onConfirm,
}: Props) {
  const telemetryKeys = Object.keys(telemetry);

  const children = telemetryKeys
    .map((key) => ({
      title: telemetry[key].name,
      id: telemetry[key].id,
      key: telemetry[key].id,
    }))
    .filter((item) => item.title.includes(keywords));

  const treeData = [
    {
      title: '遥测数据',
      id: 'telemetryData',
      key: 'telemetryData',
      children,
    },
  ];

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
        inputGroupStyle={{ margin: '8px 20px 12px' }}
        placeholder="搜索"
        onSearch={onSearch}
      />
      <Tabs index={1} display="flex" flexDirection="column" flex="1">
        <TabList display="flex" borderBottom="none">
          <CustomTab isDisabled flex="1">
            <CustomCheckbox />
            <Text {...tabTextStyle}>原始数据</Text>
          </CustomTab>
          <CustomTab flex="1">
            <Flex alignItems="center">
              <CustomCheckbox
                checkboxStatus={templateCheckboxStatus}
                onClick={() => {
                  if (templateCheckboxStatus === CheckBoxStatus.CHECKED) {
                    setTemplateCheckboxStatus(CheckBoxStatus.NOT_CHECKED);
                    setCheckedKeys([]);
                  } else {
                    setTemplateCheckboxStatus(CheckBoxStatus.CHECKED);
                    setCheckedKeys(telemetryKeys);
                  }
                }}
              />
              <Text {...tabTextStyle}>模板数据</Text>
            </Flex>
          </CustomTab>
        </TabList>
        <TabPanels flex="1">
          <TabPanel height="100%" padding="0">
            <Flex height="100%" backgroundColor="gray.50" />
          </TabPanel>
          <TabPanel height="100%" padding="0">
            <Flex height="100%" backgroundColor="gray.50">
              {(() => {
                if (isDeviceDetailLoading) {
                  return <Loading styles={{ wrapper: { flex: '1' } }} />;
                }

                if (children.length === 0) {
                  return (
                    <Center flex="1">
                      <Image src={propertiesEmpty} />
                    </Center>
                  );
                }

                return (
                  <Box flex="1" paddingTop="14px" paddingLeft="20px">
                    <Tree
                      treeData={treeData}
                      checkable
                      defaultExpandAll
                      checkedKeys={checkedKeys}
                      selectable={false}
                      onCheck={(keys) => {
                        const checkedNodeKeys = (keys as string[]).filter(
                          (key) => key !== 'telemetryData'
                        );
                        setCheckedKeys(checkedNodeKeys);
                        let checkboxStatus = CheckBoxStatus.NOT_CHECKED;
                        const { length } = telemetryKeys;
                        const { length: keysLength } = checkedNodeKeys;
                        if (keysLength > 0) {
                          if (keysLength === length) {
                            checkboxStatus = CheckBoxStatus.CHECKED;
                          } else if (keysLength < length) {
                            checkboxStatus = CheckBoxStatus.INDETERMINATE;
                          }
                        }
                        setTemplateCheckboxStatus(checkboxStatus);
                      }}
                    />
                  </Box>
                );
              })()}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        colorScheme="primary"
        margin="12px 20px"
        disabled={checkedKeys.length === 0}
        isLoading={isTelemetryDataLoading}
        onClick={onConfirm}
      >
        确定
      </Button>
    </Flex>
  );
}
