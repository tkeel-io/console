import {
  Box,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';

import {
  AddAttributeButton,
  DeleteAttributeButton,
  EditAttributeButton,
} from '@tkeel/console-business-components';
import {
  DeviceAttributeFormFields,
  ReadWriteType,
  RW_LABELS,
} from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import {
  Empty,
  FormControl,
  FormField,
  MoreAction,
  PageHeaderToolbar,
} from '@tkeel/console-components';
import {
  MoreVerticalFilledIcon,
  QuestionFilledIcon,
} from '@tkeel/console-icons';
import { AttributeItem } from '@tkeel/console-request-hooks';

import { Attributes } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

const { TextField } = FormField;
const TOOLTIP_OPTIONS = [
  { label: '数据类型', key: 'type' },
  { label: '读写类型', key: 'rw' },
];
type Props = {
  data: Attributes;
  deviceName: string;
};
function renderTooltip(info: { type: string; rw: ReadWriteType }) {
  return (
    <SimpleGrid columns={1} spacingY="4px">
      {TOOLTIP_OPTIONS.map((val) => (
        <HStack fontSize="12px" lineHeight="24px" key={val.key}>
          <Text color="gray.500">{val.label}</Text>
          <Text color="gray.700">
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              val.key === 'rw' ? RW_LABELS[info[val.key]] : info[val.key]
            }
          </Text>
        </HStack>
      ))}
    </SimpleGrid>
  );
}
function renderLabel(item: AttributeItem) {
  const { define, name, type, id } = item;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { rw } = define;
  const defaultValues = {
    name,
    id,
    type,
    define,
  };
  return (
    <Flex alignItems="center">
      <HStack h="24px" lineHeight="24px">
        <Text color="gray.700" fontSize="14px" fontWeight={500}>
          {name}
        </Text>
        <Text color="grayAlternatives.300" fontSize="12px">
          {id}
        </Text>
      </HStack>
      <Spacer />
      <Tooltip
        bg="white"
        hasArrow
        p="8px 12px"
        label={renderTooltip({ type, rw })}
        boxShadow="base"
      >
        <Center h="24px" w="24px">
          <QuestionFilledIcon size="16px" color="grayAlternatives.300" />
        </Center>
      </Tooltip>
      <MoreAction
        styles={{ wrapper: { marginLeft: '4px', cursor: 'pointer' } }}
        element={
          <Center h="100%">
            <MoreVerticalFilledIcon size="16px" color="grayAlternatives.300" />
          </Center>
        }
        buttons={[
          <DeleteAttributeButton
            key="delete"
            attributeInfo={{ name, id }}
            handleSubmit={(formValues) => {
              // eslint-disable-next-line no-console
              console.log('delete:', formValues);
            }}
          />,
          <EditAttributeButton
            key="edit"
            handleSubmit={(formValues) => {
              // eslint-disable-next-line no-console
              console.log('edit:', formValues);
            }}
            defaultValues={defaultValues}
          />,
        ]}
      />
    </Flex>
  );
}

function AttributesPanel({ deviceName, data }: Props) {
  const attributeList = values(data);
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const setAttributeData = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  return (
    <Flex flex="1" direction="column" height="100%">
      {isEmpty(data) ? (
        <Empty
          description={
            <Box>
              <Box display="inline" color="gray.700" fontWeight="500">
                [{deviceName}]&nbsp;
              </Box>
              暂无属性数据,可手动添加
            </Box>
          }
          styles={{
            wrapper: { height: '60%' },
            title: { marginTop: '0' },
            content: { marginTop: '20px' },
          }}
          title=""
          content={
            <AddAttributeButton
              handleSubmit={(formValues) => {
                // eslint-disable-next-line no-console
                console.log('add', formValues);
              }}
            />
          }
        />
      ) : (
        <>
          <PageHeaderToolbar
            styles={{ wrapper: { height: '32px', marginBottom: '12px' } }}
            name="属性数据"
            hasSearchInput
            searchInputProps={{
              onSearch() {},
              // onChange(value) {
              //   setKeyWords(value);
              // },
              // inputStyle: { background: 'gray.50' },
              // value: keyWords,
            }}
            buttons={[
              <AddAttributeButton
                key="add"
                handleSubmit={(formValues: DeviceAttributeFormFields) => {
                  // eslint-disable-next-line no-console
                  console.log('add', formValues);
                }}
              />,
            ]}
          />
          <Box flex="1" overflowY="scroll" pb="30px">
            <SimpleGrid columns={2} spacingX="20px" spacingY="12px">
              {attributeList.length > 0 &&
                attributeList.map((item: AttributeItem) => (
                  <Box
                    w="100%"
                    borderRadius="4px"
                    border="1px solid"
                    borderColor="gray.100"
                    bg="gray.50"
                    key={item.id}
                    p="4px 20px"
                  >
                    <FormControl id={item.id}>
                      <Box mr="0px">{renderLabel(item)}</Box>
                      <TextField
                        key={item.id}
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        placeholder={`默认值 ${item.define.default_value}`}
                        id={item.id}
                        onBlur={(e) => {
                          const { value } = e.target;
                          setAttributeData(value);
                        }}
                      />
                    </FormControl>
                  </Box>
                ))}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default AttributesPanel;
