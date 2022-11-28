import {
  Box,
  Center,
  Checkbox,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Switch,
  Text,
} from '@chakra-ui/react';
import { filter, fromPairs, isEmpty, omit, some, throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateAttributeButton,
  DeleteAttributeButton,
  SaveAsOtherTemplateButton,
  SaveAttributeButton,
  UpdateAttributeButton,
} from '@tkeel/console-business-components';
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
  Tooltip,
} from '@tkeel/console-components';
import { getFocusStyle } from '@tkeel/console-components/src/components/FormField/utils';
import {
  BoxFilledIcon,
  MoreVerticalFilledIcon,
  QuestionFilledIcon,
  SmcFilledIcon,
  VpcFilledIcon,
} from '@tkeel/console-icons';
import { AttributeItem, AttributeValue } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useSetAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetAttributeValueMutation';
import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AttributesValueButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AttributesValueButton';
import JsonInfoButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/JsonInfoButton';
import SaveAsSelfTemplateButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/SaveAsSelfTemplateButton';

const TOOLTIP_OPTIONS = [
  { label: '数据类型', key: 'type' },
  { label: '属性类型', key: 'rw' },
];
type Props = {
  attributeFields: AttributeItem[];
  attributeValues: AttributeValue;
  attributeDefaultValues: AttributeValue;
  wsReadyState: number;
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

function formatType(type: string) {
  let result = '';
  switch (type) {
    case 'number':
      result = 'float';
      break;
    case 'boolean':
      result = 'bool';
      break;
    case 'object':
      result = 'struct';
      break;
    default:
      result = 'string';
  }
  return result;
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
// TODO: DEVICES 优化：不同类型的数据上报/数据修改表单校验
function AttributesData({
  deviceId,
  basicInfo,
  attributeFields,
  attributeValues, // ws 数据
  refetch: refetchDeviceDetail = () => {},
  wsReadyState,
  attributeDefaultValues, // 自学习数据+模板数据
}: Props) {
  const [renderAttributeValue, setRenderAttributeValue] = useState(
    attributeDefaultValues
  );
  const [allAttributes, setAllAttributes] = useState<Array<AttributeItem>>([]);
  const [selectedDevices, setSelectedDevices] = useState<AttributeItem[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [attributeValuesHistory, setAttributeValuesHistory] =
    useState<AttributeValue>(attributeValues);

  const [currentId, setCurrentId] = useState('');
  const [focusId, setFocusId] = useState('');
  const toast = plugin.getPortalToast();
  const [keywords, setKeywords] = useState('');
  const defaultFormValue = fromPairs(
    attributeFields.map((v) => [v.id, v.define?.default_value ?? ''])
  );
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } = useForm<AttributeValue>(renderAttributeValue);
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

  const setAttributeData = ({
    id,
    value,
    cb,
  }: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    cb?: () => void;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const reqData = { id, value };
    setAttributeMutate({ data: reqData });
    if (cb) {
      cb();
    }
  };

  const getFormValue = (item: AttributeItem) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const defaultValue = attributeValues[item.id];
    const define = item?.define ?? '';
    const name = item?.name ?? '';
    const type = item?.type ?? '';
    const id = item?.id ?? '';
    const rw = define?.rw ?? 'rw';
    const ts = item?.last_time ?? '';
    const description = item?.description ?? Date.now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { defaultValue, define, name, type, id, rw, ts, description };
  };

  const attributeFieldsExtra = useMemo(() => {
    return !basicInfo?.selfLearn
      ? []
      : Object.entries(attributeValuesHistory)
          .filter((val) => !attributeFields.some((v) => v.id === val[0]))
          .map((item) => {
            const id = item[0];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const value = item[1];
            const existItem = attributeFields.find((v) => v.id === id);
            if (existItem) {
              return existItem;
            }
            const type = typeof value;
            return {
              id,
              type: formatType(type),
              name: id,
              define: {
                default_value: '',
                rw: 'rw' as ReadWriteType,
              },
              description: '',
              last_time: Date.now(),
            };
          });
  }, [attributeFields, attributeValuesHistory, basicInfo?.selfLearn]);

  const handleChange = useCallback(
    (selected: boolean, selectedFlatRows: AttributeItem) => {
      if (selected) {
        setSelectedDevices([...selectedDevices, selectedFlatRows]);
      } else {
        setSelectedDevices(
          filter(selectedDevices, (item) => {
            return item.id !== selectedFlatRows.id;
          })
        );
      }
    },
    [setSelectedDevices, selectedDevices]
  );

  const deleteCallback = useCallback(
    (callSelectedDevices: AttributeItem[]) => {
      const shouldDelete = Object.keys(attributeValuesHistory).filter((key) => {
        return some(callSelectedDevices, (select) => {
          return select.id === key;
        });
      });
      setAttributeValuesHistory(omit(attributeValuesHistory, shouldDelete));
      setSelectedDevices(
        filter(selectedDevices, (item) => {
          return some(callSelectedDevices, (select) => {
            return select.id !== item.id;
          });
        })
      );
    },
    [attributeValuesHistory, selectedDevices]
  );

  useEffect(() => {
    if (selectedDevices.length === allAttributes.length) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [selectedDevices, setSelectedAll, allAttributes, attributeFields]);

  useEffect(() => {
    setAllAttributes([...attributeFields, ...attributeFieldsExtra]);
  }, [attributeFieldsExtra, attributeFields]);

  useEffect(() => {
    if (wsReadyState === 1 && !isEmpty(attributeValuesHistory)) {
      setRenderAttributeValue({
        ...attributeDefaultValues,
        ...attributeValuesHistory,
      });
    }
  }, [wsReadyState, attributeDefaultValues, attributeValuesHistory]);

  const func = throttle(setAttributeValuesHistory, 10 * 1000);
  useEffect(() => {
    func((preState) => {
      if (isEmpty(attributeValues)) return preState;
      return { ...preState, ...attributeValues };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeValues]);

  return (
    <Flex flex="1" direction="column" height="100%">
      {isEmpty(attributeFields) && !basicInfo?.selfLearn ? (
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
            <CreateAttributeButton
              uid={deviceId}
              refetch={refetchDeviceDetail}
            />
          }
        />
      ) : (
        <>
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name={
              <Flex align="center">
                {allAttributes.length > 0 ? (
                  <>
                    <Checkbox
                      colorScheme="brand"
                      size="sm"
                      marginRight="20px"
                      isChecked={selectedAll}
                      onChange={(e) => {
                        setSelectedAll(e.target.checked);
                        if (e.target.checked) {
                          setSelectedDevices([
                            ...attributeFields,
                            ...attributeFieldsExtra,
                          ]);
                        } else {
                          setSelectedDevices([]);
                        }
                      }}
                    >
                      全选
                    </Checkbox>
                    <MoreAction
                      styles={{ actionList: { width: '110px' } }}
                      type="text"
                      buttons={[
                        <SaveAttributeButton
                          key="save"
                          uid={deviceId}
                          selectedDevices={selectedDevices}
                          refetch={refetchDeviceDetail}
                        />,
                        <DeleteAttributeButton
                          key="delete"
                          selectedDevices={selectedDevices}
                          uid={deviceId}
                          refetch={refetchDeviceDetail}
                          deleteCallback={deleteCallback}
                        />,
                      ]}
                    />
                  </>
                ) : (
                  <Text mr="12px">属性数据</Text>
                )}
              </Flex>
            }
            hasSearchInput
            searchInputProps={{
              onSearch: handleSearch,
            }}
            buttons={[
              <CreateAttributeButton
                key="add"
                uid={deviceId}
                refetch={refetchDeviceDetail}
              />,
              templateId ? (
                <MoreAction
                  styles={{ actionList: { width: '110px' } }}
                  element={
                    <IconButton
                      style={{ padding: '0 12px' }}
                      colorScheme="gray"
                      icon={<SmcFilledIcon size="14px" color="white" />}
                    >
                      同步模板
                    </IconButton>
                  }
                  key="more"
                  buttons={[
                    <SaveAsSelfTemplateButton key="sync" id={deviceId} />,
                    <SaveAsOtherTemplateButton key="save" id={deviceId} />,
                  ]}
                />
              ) : (
                <SaveAsOtherTemplateButton
                  variant="iconButton"
                  key="save"
                  id={deviceId}
                  supportRef
                  refetch={refetchDeviceDetail}
                />
              ),
            ]}
          />
          <Box flex="1" overflowY="scroll" pb="30px">
            {getFilterList({
              list: allAttributes,
              keywords,
            }).length === 0 && (
              <Empty
                title="暂无数据"
                styles={{
                  wrapper: { height: '100%' },
                }}
              />
            )}
            <SimpleGrid columns={2} spacingX="20px" spacingY="12px">
              {getFilterList({
                list: allAttributes,
                keywords,
                // eslint-disable-next-line sonarjs/cognitive-complexity
              }).map((item: AttributeItem) => {
                const {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  defaultValue,
                  name,
                  type,
                  id,
                  define,
                  rw,
                  ts,
                  description,
                } = getFormValue(item);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const defaultValueCopy = [
                  renderAttributeValue[item.id],
                  defaultValue,
                  defaultFormValue[item.id],
                ].find((v) => !Object.is(undefined, v));
                const editFormValues = {
                  name,
                  id,
                  type,
                  define,
                  description,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  last_time: ts,
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
                            <Checkbox
                              colorScheme="brand"
                              size="sm"
                              isChecked={some(
                                selectedDevices,
                                (currentItem) => currentItem.id === item.id
                              )}
                              onChange={(e) => {
                                handleChange(e.target.checked, item);
                              }}
                            />

                            {some(attributeFields, item) ? (
                              <Tooltip label="模板属性">
                                <BoxFilledIcon color="primary" />
                              </Tooltip>
                            ) : (
                              <Tooltip label="自学习属性">
                                <VpcFilledIcon />
                              </Tooltip>
                            )}

                            <Text
                              color="gray.700"
                              fontSize="14px"
                              fontWeight={500}
                            >
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
                              <SaveAttributeButton
                                key="save"
                                uid={deviceId}
                                selectedDevices={[editFormValues]}
                                refetch={refetchDeviceDetail}
                              />,
                              <UpdateAttributeButton
                                key="edit"
                                uid={deviceId}
                                defaultValues={editFormValues}
                                refetch={refetchDeviceDetail}
                              />,
                              <DeleteAttributeButton
                                key="delete"
                                selectedDevices={[editFormValues]}
                                uid={deviceId}
                                refetch={refetchDeviceDetail}
                                deleteCallback={deleteCallback}
                              />,
                            ]}
                          />
                        </Flex>
                      </Box>
                      {['int', 'float', 'double', 'string'].includes(
                        item.type
                      ) && (
                        <Flex align="center">
                          <Input
                            id={item.id}
                            bg="white"
                            mr="3"
                            defaultValue={defaultValueCopy as number | string}
                            isDisabled
                            borderColor="gray.200"
                            fontSize="14px"
                            boxShadow="none!important"
                            _placeholder={{ color: 'blackAlpha.500' }}
                            _focus={getFocusStyle(!!errors[item.id])}
                            {...register(
                              focusId === item.id
                                ? `default_edit_${item.id}`
                                : item.id
                            )}
                            onFocus={() => {
                              setValue(`default_edit_${item.id}`, defaultValue);
                              setFocusId(item.id);
                            }}
                            onBlur={(e) => {
                              const { value } = e.target;
                              setValue(item.id, value.trim());
                              setCurrentId(item.id);
                              if (value !== defaultValue) {
                                setAttributeData({
                                  id: item.id,
                                  value: value.trim(),
                                });
                              }
                            }}
                          />
                          <AttributesValueButton
                            defaultValue={defaultValueCopy as string}
                            onSubmit={(value: string, cb?: () => void) => {
                              setAttributeData({
                                id: item.id,
                                value: value.trim(),
                                cb,
                              });
                            }}
                          />
                        </Flex>
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
                            colorScheme="brand"
                            size="sm"
                            isChecked={defaultValueCopy as boolean}
                            onChange={(e) => {
                              const checked = e?.target?.checked ?? false;
                              setFocusId(item.id);
                              setCurrentId(item.id);
                              setAttributeData({
                                id: item.id,
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                value: checked,
                              });
                              // setValue(item.id, checked);
                            }}
                          />
                          <Text color="gray.700" fontSize="14px" ml="10px">
                            {defaultValueCopy ? 'true' : 'false'}
                          </Text>
                        </Flex>
                      )}
                      {['array', 'struct'].includes(item.type) && (
                        <JsonInfoButton
                          handleSetId={() => {
                            setFocusId(item.id);
                            setCurrentId(item.id);
                          }}
                          deviceId={deviceId}
                          id={item.id}
                          defaultValue={defaultValueCopy as string}
                        />
                      )}
                    </FormControl>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default AttributesData;
