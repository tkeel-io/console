import { Box, Button, Center, Flex, Image, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { Loading, SearchInput, Tree } from '@tkeel/console-components';

import iconCheckbox from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox.svg';
import iconCheckboxChecked from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox-checked.svg';
import iconCheckboxIndeterminate from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox-indeterminate.svg';
import propertiesEmpty from '@/tkeel-console-plugin-tenant-data-query/assets/images/properties-empty.svg';
import { Telemetry } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

export enum CheckBoxStatus {
  NOT_CHECKED = 'not-checked',
  CHECKED = 'checked',
  INDETERMINATE = 'indeterminate',
}

type Props = {
  telemetry: Telemetry;
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

  let checkboxImage = iconCheckbox;
  const checkboxBackgroundSize =
    templateCheckboxStatus === CheckBoxStatus.NOT_CHECKED
      ? '12px 12px'
      : '16px 16px';

  if (templateCheckboxStatus === CheckBoxStatus.CHECKED) {
    checkboxImage = iconCheckboxChecked;
  } else if (templateCheckboxStatus === CheckBoxStatus.INDETERMINATE) {
    checkboxImage = iconCheckboxIndeterminate;
  }

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
      <Flex
        alignItems="center"
        marginLeft="20px"
        width="max-content"
        height="32px"
        cursor="pointer"
        onClick={() => {
          if (templateCheckboxStatus === CheckBoxStatus.CHECKED) {
            setTemplateCheckboxStatus(CheckBoxStatus.NOT_CHECKED);
            setCheckedKeys([]);
          } else {
            setTemplateCheckboxStatus(CheckBoxStatus.CHECKED);
            setCheckedKeys(telemetryKeys);
          }
        }}
      >
        <Box
          width="12px"
          height="12px"
          backgroundImage={`url(${checkboxImage})`}
          backgroundPosition="center"
          backgroundSize={checkboxBackgroundSize}
        />
        <Text marginLeft="8px" color="gray.700" fontSize="12px">
          模板数据
        </Text>
      </Flex>
      <Flex flex="1" backgroundColor="gray.50">
        {isDeviceDetailLoading ? (
          <Loading styles={{ wrapper: { flex: '1' } }} />
        ) : children.length === 0 ? (
          <Center flex="1">
            <Image src={propertiesEmpty} />
          </Center>
        ) : (
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
        )}
      </Flex>
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
