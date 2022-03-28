import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Switch,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ReadWriteType,
  RW_LABELS,
} from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import {
  Empty,
  FormControl,
  IconButton,
  MoreAction,
  PageHeaderToolbar,
} from '@tkeel/console-components';
import { getFocusStyle } from '@tkeel/console-components/src/components/FormField/utils';
import {
  MoreVerticalFilledIcon,
  QuestionFilledIcon,
  SmcFilledIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useSetAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetAttributeValueMutation';
import {
  AttributeItem,
  Attributes,
  BasicInfo,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AddAttributeButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AddAttributeButton';
import DeleteAttributeButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeleteAttributeButton';
import EditAttributeButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/EditAttributeButton';
import JsonInfoButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/JsonInfoButton';
import SaveTemplateButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/SaveTemplateButton';
import SyncTemplateButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/SyncTemplateButton';

const TOOLTIP_OPTIONS = [
  { label: '数据类型', key: 'type' },
  { label: '读写类型', key: 'rw' },
];
type Props = {
  attributeField: AttributeItem[];
  attributeValues: Attributes;
  basicInfo: BasicInfo;
  deviceId: string;
  refetch?: () => void;
};
const FILTER_COLUMNS = ['name', 'id'];
function getFilterList({
  list,
  keywords,
}: {
  list: AttributeItem[];
  keywords: string;
}) {
  if (keywords) {
    return list.filter((item) => {
      return FILTER_COLUMNS.find((key) =>
        (item[key] as string).includes(keywords)
      );
    });
  }
  return list;
}

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
function AttributesPanel({
  deviceId,
  basicInfo,
  attributeField,
  attributeValues,
  refetch: refetchDeviceDetail = () => {},
}: Props) {
  const [currentId, setCurrentId] = useState('');
  const toast = plugin.getPortalToast();
  const [keywords, setKeywords] = useState('');
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
  };
  const deviceName = basicInfo?.name ?? '';
  const templateId = basicInfo?.templateId ?? '';
  const {
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<{ [propName: string]: unknown }>({});
  useEffect(() => {
    reset(attributeValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeValues]);
  const params = {
    id: deviceId,
    onSuccess: () => {
      toast.success('保存成功');
      refetchDeviceDetail();
    },
  };
  const { mutate: setAttributeMutate, isLoading } =
    useSetAttributeMutation(params);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setAttributeData = ({ id, value }: { id: string; value: any }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const reqData = { id, value };
    setAttributeMutate({ data: reqData });
  };

  const getFormValue = (item: AttributeItem) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const defaultValue = attributeValues[item.id];
    const define = item?.define ?? '';
    const name = item?.name ?? '';
    const type = item?.type ?? '';
    const id = item?.id ?? '';
    const rw = define?.rw ?? 'rw';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { defaultValue, define, name, type, id, rw };
  };
  return (
    <Flex flex="1" direction="column" height="100%">
      {isEmpty(attributeField) ? (
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
            <AddAttributeButton id={deviceId} refetch={refetchDeviceDetail} />
          }
        />
      ) : (
        <>
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name="属性数据"
            hasSearchInput
            searchInputProps={{
              onSearch: handleSearch,
            }}
            buttons={[
              <AddAttributeButton
                key="add"
                id={deviceId}
                refetch={refetchDeviceDetail}
              />,
              templateId ? (
                <MoreAction
                  styles={{ actionList: { width: '110px' } }}
                  element={
                    <IconButton
                      colorScheme="gray"
                      icon={<SmcFilledIcon size="14px" color="white" />}
                    >
                      同步模版
                    </IconButton>
                  }
                  key="more"
                  buttons={[
                    <SyncTemplateButton key="sync" deviceId={deviceId} />,
                    <SaveTemplateButton key="save" deviceId={deviceId} />,
                  ]}
                />
              ) : (
                <SaveTemplateButton
                  variant="iconButton"
                  key="save"
                  deviceId={deviceId}
                />
              ),
            ]}
          />
          <Box flex="1" overflowY="scroll" pb="30px">
            <SimpleGrid columns={2} spacingX="20px" spacingY="12px">
              {getFilterList({ list: attributeField, keywords }).map(
                (item: AttributeItem) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const { defaultValue, name, type, id, define, rw } =
                    getFormValue(item);
                  const editFormValues = {
                    name,
                    id,
                    type,
                    define,
                  };
                  return (
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
                        <Box mr="0px" mb="8px">
                          <Flex alignItems="center">
                            <HStack h="24px" lineHeight="24px">
                              <Text
                                color="gray.700"
                                fontSize="14px"
                                fontWeight={500}
                              >
                                {name}
                              </Text>
                              <Text
                                color="grayAlternatives.300"
                                fontSize="12px"
                              >
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
                                <QuestionFilledIcon
                                  size="16px"
                                  color="grayAlternatives.300"
                                />
                              </Center>
                            </Tooltip>
                            <MoreAction
                              styles={{
                                wrapper: {
                                  marginLeft: '4px',
                                  cursor: 'pointer',
                                },
                              }}
                              element={
                                <Center h="100%">
                                  <MoreVerticalFilledIcon
                                    size="16px"
                                    color="grayAlternatives.300"
                                  />
                                </Center>
                              }
                              buttons={[
                                <DeleteAttributeButton
                                  key="delete"
                                  defaultValues={editFormValues}
                                  id={deviceId}
                                  refetch={refetchDeviceDetail}
                                />,
                                <EditAttributeButton
                                  key="edit"
                                  id={deviceId}
                                  defaultValues={editFormValues}
                                  refetch={refetchDeviceDetail}
                                />,
                              ]}
                            />
                          </Flex>
                        </Box>
                        {['int', 'float', 'double'].includes(item.type) && (
                          <Input
                            id={item.id}
                            defaultValue={defaultValue as string}
                            bg="white"
                            placeholder={`默认值 ${
                              item?.define?.default_value as string
                            }`}
                            isDisabled={isLoading && currentId === item.id}
                            borderColor="gray.200"
                            fontSize="14px"
                            boxShadow="none!important"
                            _placeholder={{ color: 'blackAlpha.500' }}
                            _focus={getFocusStyle(!!errors[item.id])}
                            {...register(
                              currentId === item.id ? 'default_edit' : item.id,
                              {}
                            )}
                            onFocus={() => {
                              setCurrentId(item.id);
                              setValue('default_edit', defaultValue);
                            }}
                            onBlur={(e) => {
                              const { value } = e.target;
                              if (value !== defaultValue) {
                                setAttributeData({ id: item.id, value });
                              }
                            }}
                          />
                        )}
                        {item.type === 'bool' && (
                          <Flex
                            h="40px"
                            flexDir="row"
                            align="center"
                            justify="flex-start"
                          >
                            <Switch
                              isDisabled={isLoading && currentId === item.id}
                              colorScheme="primary"
                              size="sm"
                              isChecked={defaultValue as boolean}
                              onChange={(e) => {
                                setCurrentId(item.id);
                                setAttributeData({
                                  id: item.id,
                                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                  value: e?.target?.checked ?? false,
                                });
                              }}
                            />
                            <Text color="gray.700" fontSize="14px" ml="10px">
                              {defaultValue ? 'true' : 'false'}
                            </Text>
                          </Flex>
                        )}
                        {['array', 'struct'].includes(item.type) && (
                          <JsonInfoButton
                            handleSetId={() => {
                              setCurrentId(item.id);
                            }}
                            deviceId={deviceId}
                            id={item.id}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            defaultValue={defaultValue}
                          />
                        )}
                      </FormControl>
                    </Box>
                  );
                }
              )}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default AttributesPanel;
