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
import { fromPairs, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateAttributeButton,
  DeleteAttributeButton,
  SaveAsOtherTemplateButton,
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
} from '@tkeel/console-components';
import { getFocusStyle } from '@tkeel/console-components/src/components/FormField/utils';
import {
  MoreVerticalFilledIcon,
  QuestionFilledIcon,
  SmcFilledIcon,
} from '@tkeel/console-icons';
import { AttributeItem, AttributeValue } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useSetAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetAttributeValueMutation';
import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import JsonInfoButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/JsonInfoButton';
import SaveAsSelfTemplateButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/SaveAsSelfTemplateButton';

const TOOLTIP_OPTIONS = [
  { label: '数据类型', key: 'type' },
  { label: '读写类型', key: 'rw' },
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
function AttributesData({
  deviceId,
  basicInfo,
  attributeFields,
  attributeValues,
  refetch: refetchDeviceDetail = () => {},
  wsReadyState,
  attributeDefaultValues,
}: Props) {
  const [renderAttributeValue, setRenderAttributeValue] = useState(
    attributeDefaultValues
  );

  useEffect(() => {
    if (wsReadyState === 1 && !isEmpty(attributeValues)) {
      setRenderAttributeValue(attributeValues);
    }
  }, [wsReadyState, attributeValues]);
  const [currentId, setCurrentId] = useState('');
  const [focusId, setFocusId] = useState('');
  const toast = plugin.getPortalToast();
  const [keywords, setKeywords] = useState('');
  const defaultFormValue = fromPairs(
    attributeFields.map((v) => [v.id, v.define.default_value])
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
      {isEmpty(attributeFields) ? (
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
            name="属性数据"
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
                      colorScheme="gray"
                      icon={<SmcFilledIcon size="14px" color="white" />}
                    >
                      同步模版
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
                />
              ),
            ]}
          />
          <Box flex="1" overflowY="scroll" pb="30px">
            <SimpleGrid columns={2} spacingX="20px" spacingY="12px">
              {getFilterList({ list: attributeFields, keywords }).map(
                (item: AttributeItem) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const { defaultValue, name, type, id, define, rw } =
                    getFormValue(item);
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const defaultValueCopy = [
                    renderAttributeValue[item.id],
                    defaultValue,
                    defaultFormValue[item.id],
                  ].find((v) => !Object.is(undefined, v));
                  const editFormValues = { name, id, type, define };
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
                                  uid={deviceId}
                                  refetch={refetchDeviceDetail}
                                />,
                                <UpdateAttributeButton
                                  key="edit"
                                  uid={deviceId}
                                  defaultValues={editFormValues}
                                  refetch={refetchDeviceDetail}
                                />,
                              ]}
                            />
                          </Flex>
                        </Box>
                        {['int', 'float', 'double', 'string'].includes(
                          item.type
                        ) && (
                          <Input
                            id={item.id}
                            bg="white"
                            defaultValue={defaultValueCopy as number | string}
                            isDisabled={isLoading && currentId === item.id}
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
                }
              )}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default AttributesData;
